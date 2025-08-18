import { randomUUID } from 'node:crypto';
import { UserEntity } from './user.entity';

export class ChatSessionAggregate {
  private _id: string;
  private _userId: string;
  private _createdAt: Date;

  private constructor(id: string, userId: string, createdAt: Date) {
    this._id = id;
    this._userId = userId;
    this._createdAt = createdAt;
  }

  static create(user: UserEntity): ChatSessionAggregate {
    return new ChatSessionAggregate(randomUUID(), user.id, new Date());
  }

  static restore(
    id: string,
    userId: string,
    createdAt: Date,
  ): ChatSessionAggregate {
    return new ChatSessionAggregate(id, userId, createdAt);
  }

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
}
