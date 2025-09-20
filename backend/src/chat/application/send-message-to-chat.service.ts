import { ChatMessageEntity } from '@chat/domain/chat-message.entity';
import { ChatRepository } from '@chat/infra/repository/chat.repository';
import { Inject, Injectable } from '@nestjs/common';
import {
  IAnswerMessageService,
  OPENAI_ANSWER_MESSAGE_SERVICE_PROVIDER,
} from '@shared/interface/llm/service/answer-message';

@Injectable()
export class SendMessageToChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    @Inject(OPENAI_ANSWER_MESSAGE_SERVICE_PROVIDER)
    private readonly answerMessageService: IAnswerMessageService,
  ) {}

  async execute(chatId: string, userId: string, message: string) {
    const chatSession = await this.chatRepository.findByIdAndUserId(
      chatId,
      userId,
    );
    if (!chatSession) throw new Error('Chat session not found');
    const userMessage = ChatMessageEntity.create(message, 'user', 'text');
    const llmAnswer = await this.answerMessageService.execute(message);
    const llmAnswerMessage = ChatMessageEntity.create(
      llmAnswer?.message || '',
      'assistant',
      llmAnswer?.action?.type === 'suggest_carts'
        ? 'suggest_carts_result'
        : 'text',
      llmAnswer.responseId,
    );
    chatSession.addMessage(userMessage);
    chatSession.addMessage(llmAnswerMessage);
    console.log('messages:', chatSession.messages);
    return llmAnswerMessage.toObject().content;
  }
}
