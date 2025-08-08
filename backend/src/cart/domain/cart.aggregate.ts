import { randomUUID } from 'node:crypto';
import { CartItemEntity } from './cart-item.entity';
import { UserEntity } from './user.entity';
import { StoreEntity } from './store.entity';
import { ProductEntity } from './product.entity';

type CartItemProp = {
  id: string;
  productId: string;
  quantity: number;
};

type CreateCartItemProp = {
  product: ProductEntity;
  quantity: number;
};

export class CartAggregate {
  private _id: string;
  private _userId: string;
  private _storeId: string;
  private _items: CartItemEntity[];
  private _active: boolean;

  private constructor(
    id: string,
    userId: string,
    storeId: string,
    items: CartItemEntity[],
    active: boolean,
  ) {
    this._id = id;
    this._userId = userId;
    this._storeId = storeId;
    this._items = items;
    this._active = active;
  }

  static create(
    user: UserEntity,
    store: StoreEntity,
    items: CreateCartItemProp[],
    active: boolean,
  ): CartAggregate {
    const invalidItem = items.find((item) => {
      return item.product.storeId !== store.id;
    });
    if (invalidItem) {
      throw new Error(
        `Not found ${invalidItem.product.id} in store ${store.id}`,
      );
    }
    return new CartAggregate(
      randomUUID(),
      user.id,
      store.id,
      items.map((item) => CartItemEntity.create(item.product, item.quantity)),
      active,
    );
  }

  static restore(
    id: string,
    userId: string,
    storeId: string,
    items: CartItemProp[],
    active: boolean,
  ): CartAggregate {
    return new CartAggregate(
      id,
      userId,
      storeId,
      items.map((item) =>
        CartItemEntity.restore(item.id, item.productId, item.quantity),
      ),
      active,
    );
  }

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get storeId(): string {
    return this._storeId;
  }

  get items(): CartItemProp[] {
    return this._items.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
    }));
  }

  get active(): boolean {
    return this._active;
  }

  addItem(user: UserEntity, product: ProductEntity, quantity: number): void {
    if (!this._active) {
      throw new Error('Cannot add item to inactive cart');
    }
    if (user.id !== this._userId) {
      return;
    }
    if (product.storeId !== this._storeId) {
      return;
    }
    const existingItem = this._items.find(
      (item) => item.productId === product.id,
    );
    if (existingItem) {
      existingItem.quantity += quantity;
      return;
    }
    const newItem = CartItemEntity.create(product, quantity);
    this._items.push(newItem);
  }

  disable(): void {
    this._active = false;
  }
}
