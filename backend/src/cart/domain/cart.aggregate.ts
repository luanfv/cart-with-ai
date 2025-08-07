import { randomUUID } from 'node:crypto';
import { CartItemEntity } from './cart-item.entity';

export class Cart {
  private _id: string;
  private _userId: number;
  private _storeId: number;
  private _items: CartItemEntity[];
  private _active: boolean;

  private constructor(
    id: string,
    userId: number,
    storeId: number,
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
    userId: number,
    storeId: number,
    items: CartItemEntity[],
    active: boolean,
  ): Cart {
    return new Cart(randomUUID(), userId, storeId, items, active);
  }

  static restore(
    id: string,
    userId: number,
    storeId: number,
    items: CartItemEntity[],
    active: boolean,
  ): Cart {
    return new Cart(id, userId, storeId, items, active);
  }

  get id(): string {
    return this._id;
  }

  get userId(): number {
    return this._userId;
  }

  get storeId(): number {
    return this._storeId;
  }

  get items(): CartItemEntity[] {
    return this._items;
  }

  get active(): boolean {
    return this._active;
  }

  addItem(productId: number, quantity: number): void {
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

  removeItem(productId: number): void {
    this._items = this._items.filter((item) => item.productId !== productId);
  }

  updateQuantity(productId: number, quantity: number): void {
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
