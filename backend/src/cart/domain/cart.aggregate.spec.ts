import { CartAggregate } from './cart.aggregate';
import { UserEntity } from './user.entity';
import { StoreEntity } from './store.entity';
import { ProductEntity } from './product.entity';

describe('CartAggregate unit tests', () => {
  const expectedUserId = 'user-1';
  const expectedStoreId = 'store-1';
  const expectedProductId = 'prod-1';
  const expectedProduct2Id = 'prod-2';
  const expectedCartId = 'cart-1';
  const expectedCartItemId = 'item-1';
  const expectedQuantity = 2;
  const expectedNewQuantity = 5;
  const expectedEmail = 'user@email.com';
  const expectedStoreName = 'Store';
  const expectedProductName = 'Product';
  const expectedProduct2Name = 'Product2';

  const user = UserEntity.restore(expectedUserId, 'User', expectedEmail);
  const store = StoreEntity.restore(expectedStoreId, expectedStoreName);
  const product = ProductEntity.restore(
    expectedProductId,
    expectedProductName,
    100,
    expectedStoreId,
    [],
  );
  const product2 = ProductEntity.restore(
    expectedProduct2Id,
    expectedProduct2Name,
    200,
    expectedStoreId,
    [],
  );

  describe('WHEN create is called with valid data', () => {
    const items = [{ product, quantity: expectedQuantity }];
    const cart = CartAggregate.create(user, store, items, true);

    it('SHOULD create with correct userId', () => {
      expect(cart.userId).toEqual(expectedUserId);
    });

    it('SHOULD create with correct storeId', () => {
      expect(cart.storeId).toEqual(expectedStoreId);
    });

    it('SHOULD create with correct items', () => {
      expect(cart.items[0].productId).toEqual(expectedProductId);
    });
  });

  describe('WHEN create is called with item from another store', () => {
    const productOtherStore = ProductEntity.restore(
      'prod-3',
      'Product3',
      300,
      'store-2',
      [],
    );
    const items = [{ product: productOtherStore, quantity: 1 }];

    it('SHOULD throw error', () => {
      const expectedError = new Error('Not found prod-3 in store store-1');
      expect(() => CartAggregate.create(user, store, items, true)).toThrow(
        expectedError,
      );
    });
  });

  describe('WHEN restore is called', () => {
    const cart = CartAggregate.restore(
      expectedCartId,
      expectedUserId,
      expectedStoreId,
      [
        {
          id: expectedCartItemId,
          productId: expectedProductId,
          quantity: expectedQuantity,
        },
      ],
      true,
    );

    it('SHOULD restore with correct id', () => {
      expect(cart.id).toEqual(expectedCartId);
    });

    it('SHOULD restore with correct items', () => {
      expect(cart.items[0].id).toEqual(expectedCartItemId);
    });
  });

  describe('WHEN addItem is called with a new product', () => {
    const cart = CartAggregate.create(user, store, [], true);
    const result = cart.addItem(user, product2, expectedQuantity);

    it('SHOULD add item with correct productId', () => {
      expect(result.productId).toEqual(expectedProduct2Id);
    });
  });

  describe('WHEN addItem is called with an existing product', () => {
    const cart = CartAggregate.create(
      user,
      store,
      [{ product, quantity: expectedQuantity }],
      true,
    );
    cart.addItem(user, product, expectedNewQuantity);

    it('SHOULD increase quantity', () => {
      const expected = expectedQuantity + expectedNewQuantity;
      expect(cart.items[0].quantity).toEqual(expected);
    });
  });

  describe('WHEN addItem is called on inactive cart', () => {
    const cart = CartAggregate.create(user, store, [], false);

    it('SHOULD throw error', () => {
      const expectedError = new Error('Cannot add item to inactive cart');
      expect(() => cart.addItem(user, product, 1)).toThrow(expectedError);
    });
  });

  describe('WHEN addItem is called by another user', () => {
    const cart = CartAggregate.create(user, store, [], true);
    const otherUser = UserEntity.restore('user-2', 'Other', 'other@email.com');

    it('SHOULD throw error', () => {
      const expectedError = new Error('User does not own this cart');
      expect(() => cart.addItem(otherUser, product, 1)).toThrow(expectedError);
    });
  });

  describe('WHEN addItem is called with product from another store', () => {
    const cart = CartAggregate.create(user, store, [], true);
    const productOtherStore = ProductEntity.restore(
      'prod-3',
      'Product3',
      300,
      'store-2',
      [],
    );

    it('SHOULD throw error', () => {
      const expectedError = new Error('Product does not belong to this store');
      expect(() => cart.addItem(user, productOtherStore, 1)).toThrow(
        expectedError,
      );
    });
  });

  describe('WHEN changeItemQuantity is called with valid data', () => {
    const cart = CartAggregate.create(
      user,
      store,
      [{ product, quantity: expectedQuantity }],
      true,
    );
    const cartItemId = cart.items[0].id;
    cart.changeItemQuantity(user, cartItemId, expectedNewQuantity);

    it('SHOULD change item quantity', () => {
      expect(cart.items[0].quantity).toEqual(expectedNewQuantity);
    });
  });

  describe('WHEN changeItemQuantity is called on inactive cart', () => {
    const cart = CartAggregate.create(
      user,
      store,
      [{ product, quantity: expectedQuantity }],
      false,
    );
    const cartItemId = cart.items[0].id;

    it('SHOULD throw error', () => {
      const expected = 'Cannot change item quantity in inactive cart';
      expect(() => cart.changeItemQuantity(user, cartItemId, 5)).toThrow(
        expected,
      );
    });
  });

  describe('WHEN changeItemQuantity is called by another user', () => {
    const cart = CartAggregate.create(
      user,
      store,
      [{ product, quantity: expectedQuantity }],
      true,
    );
    const cartItemId = cart.items[0].id;
    const otherUser = UserEntity.restore('user-2', 'Other', 'other@email.com');

    it('SHOULD throw error', () => {
      const expected = 'User does not own this cart';
      expect(() => cart.changeItemQuantity(otherUser, cartItemId, 5)).toThrow(
        expected,
      );
    });
  });

  describe('WHEN changeItemQuantity is called with zero or negative quantity', () => {
    const cart = CartAggregate.create(
      user,
      store,
      [{ product, quantity: expectedQuantity }],
      true,
    );
    const cartItemId = cart.items[0].id;

    it('SHOULD throw error', () => {
      const expected = 'Quantity must be greater than zero';
      expect(() => cart.changeItemQuantity(user, cartItemId, 0)).toThrow(
        expected,
      );
    });
  });

  describe('WHEN changeItemQuantity is called with item not found', () => {
    const cart = CartAggregate.create(
      user,
      store,
      [{ product, quantity: expectedQuantity }],
      true,
    );

    it('SHOULD throw error', () => {
      const expected = 'Item not found in cart';
      expect(() => cart.changeItemQuantity(user, 'not-found', 1)).toThrow(
        expected,
      );
    });
  });

  describe('WHEN removeItem is called with valid data', () => {
    const cart = CartAggregate.create(
      user,
      store,
      [{ product, quantity: expectedQuantity }],
      true,
    );
    const cartItemId = cart.items[0].id;
    cart.removeItem(user, cartItemId);

    it('SHOULD remove item from cart', () => {
      const expectedLength = 0;
      expect(cart.items.length).toEqual(expectedLength);
    });
  });

  describe('WHEN removeItem is called on inactive cart', () => {
    const cart = CartAggregate.create(
      user,
      store,
      [{ product, quantity: expectedQuantity }],
      false,
    );
    const cartItemId = cart.items[0].id;

    it('SHOULD throw error', () => {
      const expectedError = new Error('Cannot remove item from inactive cart');
      expect(() => cart.removeItem(user, cartItemId)).toThrow(expectedError);
    });
  });

  describe('WHEN removeItem is called by another user', () => {
    const cart = CartAggregate.create(
      user,
      store,
      [{ product, quantity: expectedQuantity }],
      true,
    );
    const cartItemId = cart.items[0].id;
    const otherUser = UserEntity.restore('user-2', 'Other', 'other@email.com');

    it('SHOULD throw error', () => {
      const expectedError = new Error('User does not own this cart');
      expect(() => cart.removeItem(otherUser, cartItemId)).toThrow(
        expectedError,
      );
    });
  });

  describe('WHEN removeItem is called with item not found', () => {
    const cart = CartAggregate.create(
      user,
      store,
      [{ product, quantity: expectedQuantity }],
      true,
    );

    it('SHOULD throw error', () => {
      const expectedError = new Error('Item not found in cart');
      expect(() => cart.removeItem(user, 'not-found')).toThrow(expectedError);
    });
  });

  describe('WHEN disable is called', () => {
    const cart = CartAggregate.create(user, store, [], true);
    cart.disable();

    it('SHOULD set active to false', () => {
      const expectedActive = false;
      expect(cart.active).toEqual(expectedActive);
    });
  });
});
