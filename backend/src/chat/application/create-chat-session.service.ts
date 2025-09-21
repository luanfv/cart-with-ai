import { UserRepository } from '@chat/infra/repository/user.repository';
import { ChatSessionAggregate } from '@chat/domain/chat-session.aggregate';
import { ChatRepository } from '@chat/infra/repository/chat.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CreateChatSessionService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    const chatSession = ChatSessionAggregate.create(user);
    await this.chatRepository.create(chatSession);
    return chatSession;
  }
}
