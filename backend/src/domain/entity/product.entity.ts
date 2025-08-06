export class ProductEntity {
  private _id: number;
  private _name: string;
  private _price: number;
  private _embedding: number[];

  private constructor(
    id: number,
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
    id: number,
    name: string,
    price: number,
    embedding: number[],
  ): ProductEntity {
    return new ProductEntity(id, name, price, embedding);
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }
}
