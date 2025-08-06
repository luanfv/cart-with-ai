export class StoreEntity {
  private _id: number;
  private _name: string;

  private constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }

  public static restore(id: number, name: string): StoreEntity {
    return new StoreEntity(id, name);
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
}
