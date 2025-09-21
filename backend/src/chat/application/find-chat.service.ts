import { ChatRepository } from '@chat/infra/repository/chat.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  async execute(chatId: string) {
    const chatSession = await this.chatRepository.findById(chatId);
    if (!chatSession) throw new NotFoundException('Chat session not found');
    return chatSession;
  }
}
