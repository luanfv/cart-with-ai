export class StoreEntity {
  private _id: string;
  private _name: string;

  private constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
  }

  public static restore(id: string, name: string): StoreEntity {
    return new StoreEntity(id, name);
  }

  get id(): string {
    return this._id;
  }
}
