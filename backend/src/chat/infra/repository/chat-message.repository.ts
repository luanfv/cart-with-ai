import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { ChatMessage } from './../../../shared/infra/database/entity/chat-message.entity';
import { Injectable } from '@nestjs/common';
import { ChatMessageEntity } from '@chat/domain/chat-message.entity';

type SaveChatMessage = {
  id: string;
  chatSessionId: string;
  content: string;
  sender: 'user' | 'assistant';
  openAiMessageId?: string;
  createdAt: Date;
  messageType: 'text' | 'suggest_carts_result';
};

@Injectable()
export class ChatMessageRepository {
  constructor(
    @InjectRepository(ChatMessage)
    private chatMessageRepo: Repository<ChatMessage>,
  ) {}

  async saveManyMessages(messages: SaveChatMessage[]): Promise<void> {
    await this.chatMessageRepo.save(messages);
  }

  async findLastMessageByChatSessionId(
    chatSessionId: string,
  ): Promise<ChatMessageEntity | null> {
    try {
      const message = await this.chatMessageRepo.findOne({
        where: { chatSessionId, openAiMessageId: Not(IsNull()) },
        order: { createdAt: 'DESC' },
      });
      console.log('message', message);
      if (!message) return null;
      return ChatMessageEntity.restore(
        message.id,
        message.chatSessionId,
        message.content,
        message.sender as 'user' | 'assistant',
        message.createdAt,
        message.messageType as 'text' | 'suggest_carts_result',
        message.openAiMessageId,
      );
    } catch {
      return null;
    }
  }
}
