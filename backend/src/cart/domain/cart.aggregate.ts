import { randomUUID } from 'node:crypto';
import { CartItemEntity } from './cart-item.entity';

type CartItemProp = {
  id: string;
  productId: string;
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
    userId: string,
    storeId: string,
    items: CartItemProp[],
    active: boolean,
  ): CartAggregate {
    return new CartAggregate(
      randomUUID(),
      userId,
      storeId,
      items.map((item) =>
        CartItemEntity.restore(item.id, item.productId, item.quantity),
      ),
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

  get items(): CartItemEntity[] {
    return this._items;
  }

  get active(): boolean {
    return this._active;
  }

  addItem(productId: string, quantity: number): void {
    const existingItem = this._items.find(
      (item) => item.productId === productId,
    );
    if (existingItem) {
      existingItem.quantity += quantity;
      return;
    }
    const newItem = CartItemEntity.create(productId, quantity);
    this._items.push(newItem);
  }

  removeItem(productId: string): void {
    this._items = this._items.filter((item) => item.productId !== productId);
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this._items.find((item) => item.productId === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  clearCart(): void {
    this._items = [];
  }

  setActive(active: boolean): void {
    this._active = active;
  }
}
