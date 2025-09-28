import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessageAction } from '@shared/infra/database/entity/chat-message-action.entity';

export class ChatMessageActionRepository {
  constructor(
    @InjectRepository(ChatMessageAction)
    private chatMessageActionRepo: Repository<ChatMessageAction>,
  ) {}

  async save(action: ChatMessageAction): Promise<void> {
    await this.chatMessageActionRepo.save(action);
  }
}
