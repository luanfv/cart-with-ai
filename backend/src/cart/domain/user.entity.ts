export class UserEntity {
  private _id: string;
  private _name: string;
  private _email: string;

  private constructor(id: string, name: string, email: string) {
    this._id = id;
    this._name = name;
    this._email = email;
  }

  static restore(id: string, name: string, email: string): UserEntity {
    return new UserEntity(id, name, email);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }
}
