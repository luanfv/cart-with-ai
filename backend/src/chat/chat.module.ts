import { Module } from '@nestjs/common';
import { ChatController } from './infra/api/chat.controller';
import { CreateChatSessionService } from './application/create-chat-session.service';
import { FindChatService } from './application/find-chat.service';
import { ChatRepository } from './infra/repository/chat.repository';
import { UserRepository } from './infra/repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatSession } from '@shared/infra/database/entity/chat-session.entity';
import { User } from '@shared/infra/database/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, ChatSession])],
  controllers: [ChatController],
  providers: [
    CreateChatSessionService,
    FindChatService,
    ChatRepository,
    UserRepository,
  ],
})
export class ChatModule {}
