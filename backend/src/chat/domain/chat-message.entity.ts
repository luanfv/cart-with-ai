import { randomUUID } from 'node:crypto';

export class ChatMessageEntity {
  private _id: string;
  private _chatSessionId?: string;
  private _content: string;
  private _sender: 'user' | 'assistant';
  private _openAiMessageId?: string;
  private _createdAt: Date;
  private _messageType: 'text' | 'suggest_carts_result';

  private constructor(
    id: string,
    chatSessionId: string,
    content: string,
    sender: 'user' | 'assistant',
    createdAt: Date,
    messageType: 'text' | 'suggest_carts_result',
    openAiMessageId?: string,
  ) {
    this._id = id;
    this._chatSessionId = chatSessionId;
    this._content = content;
    this._sender = sender;
    this._createdAt = createdAt;
    this._messageType = messageType;
    this._openAiMessageId = openAiMessageId;
  }

  static create(
    content: string,
    sender: 'user' | 'assistant',
    messageType: 'text' | 'suggest_carts_result',
    openAiMessageId?: string,
  ): ChatMessageEntity {
    return new ChatMessageEntity(
      randomUUID(),
      undefined,
      content,
      sender,
      new Date(),
      messageType,
      openAiMessageId,
    );
  }

  static restore(
    id: string,
    chatSessionId: string,
    content: string,
    sender: 'user' | 'assistant',
    createdAt: Date,
    messageType: 'text' | 'suggest_carts_result',
    openAiMessageId?: string,
  ): ChatMessageEntity {
    return new ChatMessageEntity(
      id,
      chatSessionId,
      content,
      sender,
      createdAt,
      messageType,
      openAiMessageId,
    );
  }

  get id(): string {
    return this._id;
  }

  get chatSessionId(): string | undefined {
    return this._chatSessionId;
  }

  toObject() {
    return {
      id: this._id,
      chatSessionId: this._chatSessionId,
      content: this._content,
      sender: this._sender,
      openAiMessageId: this._openAiMessageId,
      createdAt: this._createdAt,
      messageType: this._messageType,
    };
  }
}
