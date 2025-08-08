export class ProductEntity {
  private _id: string;
  private _name: string;
  private _price: number;
  private _embedding: number[];

  private constructor(
    id: string,
    name: string,
    price: number,
    embedding: number[],
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._embedding = embedding;
  }

  public static restore(
    id: string,
    name: string,
    price: number,
    embedding: number[],
  ): ProductEntity {
    return new ProductEntity(id, name, price, embedding);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }
}
