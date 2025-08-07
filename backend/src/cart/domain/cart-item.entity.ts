import { randomUUID } from 'node:crypto';

export class CartItemEntity {
  private _id: string;
  private _productId: number;
  private _quantity: number;

  private constructor(id: string, productId: number, quantity: number) {
    this._id = id;
    this._productId = productId;
    this._quantity = quantity;
  }

  static create(productId: number, quantity: number): CartItemEntity {
    return new CartItemEntity(randomUUID(), productId, quantity);
  }

  static restore(
    id: string,
    productId: number,
    quantity: number,
  ): CartItemEntity {
    return new CartItemEntity(id, productId, quantity);
  }

  get id(): string {
    return this._id;
  }

  get productId(): number {
    return this._productId;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(quantity: number) {
    this._quantity = quantity;
  }
}
