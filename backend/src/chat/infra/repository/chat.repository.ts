import { InjectRepository } from '@nestjs/typeorm';
import { ChatSession } from '@shared/infra/database/entity/chat-session.entity';
import { ChatSessionAggregate } from 'chat/domain/chat-session.entity';
import { Repository } from 'typeorm';

export class ChatRepository {
  constructor(
    @InjectRepository(ChatSession)
    private readonly repository: Repository<ChatSession>,
  ) {}

  async create(chatSession: ChatSessionAggregate): Promise<void> {
    await this.repository.save({
      userId: chatSession.userId,
      id: chatSession.id,
      createdAt: chatSession.createdAt,
    });
  }

  async findById(id: string): Promise<ChatSessionAggregate | null> {
    const chatSessionFromDatabase = await this.repository.findOne({
      where: {
        id,
      },
    });
    if (!chatSessionFromDatabase) return null;
    return ChatSessionAggregate.restore(
      chatSessionFromDatabase.id,
      chatSessionFromDatabase.userId,
      chatSessionFromDatabase.createdAt,
    );
  }

  async findByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<ChatSessionAggregate | null> {
    const chatSessionFromDatabase = await this.repository.findOne({
      where: {
        id,
        userId,
      },
    });
    if (!chatSessionFromDatabase) return null;
    return ChatSessionAggregate.restore(
      chatSessionFromDatabase.id,
      chatSessionFromDatabase.userId,
      chatSessionFromDatabase.createdAt,
    );
  }
}
