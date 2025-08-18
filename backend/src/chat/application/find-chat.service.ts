import { ChatRepository } from '@chat/infra/repository/chat.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  async execute(chatId: string) {
    const chatSession = await this.chatRepository.findByIdAndUserId(chatId);
    if (!chatSession) throw new Error('Chat session not found');
    return chatSession;
  }
}
