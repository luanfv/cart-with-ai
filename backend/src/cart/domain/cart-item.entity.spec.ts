import { CartItemEntity } from './cart-item.entity';
import { ProductEntity } from './product.entity';

describe('CartItemEntity unit tests', () => {
  describe('WHEN call the CartItemEntity create', () => {
    const product = ProductEntity.restore(
      'product-id',
      'product-1',
      100,
      'store-1',
      [],
    );
    const cartItem = CartItemEntity.create(product, 7);
    const expectedQuantity = 7;
    const expectedId = 'product-id';

    it('SHOULD create with correct quantity', () => {
      expect(cartItem.quantity).toEqual(expectedQuantity);
    });

    it('SHOULD create with correct productId', () => {
      expect(cartItem.productId).toEqual(expectedId);
    });
  });

  describe('WHEN call the CartItemEntity restore', () => {
    const cartItem = CartItemEntity.restore('id', 'product-id', 2);
    const expectedId = 'id';
    const expectedProductId = 'product-id';
    const expectedQuantity = 2;

    it('SHOULD restore with correct id', () => {
      expect(cartItem.id).toEqual(expectedId);
    });

    it('SHOULD restore with correct productId', () => {
      expect(cartItem.productId).toEqual(expectedProductId);
    });

    it('SHOULD restore with correct quantity', () => {
      expect(cartItem.quantity).toEqual(expectedQuantity);
    });
  });

  describe('WHEN change quantity', () => {
    it('SHOULD update the quantity', () => {
      const cartItem = CartItemEntity.restore('item-4', 'prod-4', 1);
      cartItem.quantity = 10;
      expect(cartItem.quantity).toEqual(10);
    });
  });
});
