import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './../../../shared/infra/database/entity/chat-message.entity';
import { Injectable } from '@nestjs/common';

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
}
