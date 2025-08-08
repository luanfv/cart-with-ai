export class ProductEntity {
  private _id: string;
  private _name: string;
  private _price: number;
  private _storeId: string;
  private _embedding: number[];

  private constructor(
    id: string,
    name: string,
    price: number,
    storeId: string,
    embedding: number[],
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._storeId = storeId;
    this._embedding = embedding;
  }

  public static restore(
    id: string,
    name: string,
    price: number,
    storeId: string,
    embedding: number[],
  ): ProductEntity {
    return new ProductEntity(id, name, price, storeId, embedding);
  }

  get id(): string {
    return this._id;
  }

  get storeId(): string {
    return this._storeId;
  }
}
