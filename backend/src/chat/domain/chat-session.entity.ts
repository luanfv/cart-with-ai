import { randomUUID } from 'node:crypto';
import { UserEntity } from './user.entity';
import { ChatMessageEntity } from './chat-message.entity';

export class ChatSessionAggregate {
  private _id: string;
  private _userId: string;
  private _createdAt: Date;
  private _messages: ChatMessageEntity[] = [];

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

  get messages(): {
    id: string;
    chatSessionId: string;
    content: string;
    sender: 'user' | 'assistant';
    openAiMessageId: string;
    createdAt: Date;
    messageType: 'text' | 'suggest_carts_result';
  }[] {
    return this._messages.map((message) => message.toObject());
  }

  addMessage(message: ChatMessageEntity): void {
    if (!!message.chatSessionId && message.chatSessionId !== this._id) {
      throw new Error('Message does not belong to this chat session');
    }
    const { id, content, sender, openAiMessageId, createdAt, messageType } =
      message.toObject();
    this._messages.push(
      ChatMessageEntity.restore(
        id,
        this._id,
        content,
        sender,
        createdAt,
        messageType,
        openAiMessageId,
      ),
    );
  }
}
