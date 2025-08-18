import { CreateChatSessionService } from '@chat/application/create-chat-session.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  CreateChatSessionBodyDtoInput,
  CreateChatSessionDtoOutput,
} from './dto/create-chat-session.dto';
import { FindChatService } from '@chat/application/find-chat.service';
import { FindChatDtoOutput, FindChatParamDtoInput } from './dto/find-chat.dto';

@Controller('/api/chat')
export class ChatController {
  constructor(
    private readonly createChatSessionService: CreateChatSessionService,
    private readonly findChatService: FindChatService,
  ) {}

  @Post()
  async createChatSession(@Body() body: CreateChatSessionBodyDtoInput) {
    const chatSession = await this.createChatSessionService.execute(
      body.userId,
    );
    return new CreateChatSessionDtoOutput(chatSession.id);
  }

  @Get('/:id')
  async findChat(@Param() params: FindChatParamDtoInput) {
    const chatSession = await this.findChatService.execute(params.id);
    return new FindChatDtoOutput(
      chatSession.id,
      chatSession.userId,
      chatSession.createdAt,
    );
  }
}
