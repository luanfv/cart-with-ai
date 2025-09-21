import { Module } from '@nestjs/common';
import { ChatController } from './infra/api/chat.controller';
import { CreateChatSessionService } from './application/create-chat-session.service';
import { FindChatService } from './application/find-chat.service';
import { ChatRepository } from './infra/repository/chat.repository';
import { UserRepository } from './infra/repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatSession } from '@shared/infra/database/entity/chat-session.entity';
import { User } from '@shared/infra/database/entity/user.entity';
import { SendMessageToChatService } from './application/send-message-to-chat.service';
import { ChatMessageRepository } from './infra/repository/chat-message.repository';
import { ChatMessage } from '@shared/infra/database/entity/chat-message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, ChatSession, ChatMessage])],
  controllers: [ChatController],
  providers: [
    CreateChatSessionService,
    FindChatService,
    SendMessageToChatService,
    ChatRepository,
    UserRepository,
    ChatMessageRepository,
  ],
})
export class ChatModule {}
