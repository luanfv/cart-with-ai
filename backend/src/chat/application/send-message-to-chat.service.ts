import { ChatMessageActionRepository } from '@chat/infra/repository/chat-message-action.repository';
import { ChatMessageRepository } from './../infra/repository/chat-message.repository';
import { ChatMessageEntity } from '@chat/domain/chat-message.entity';
import { ChatRepository } from '@chat/infra/repository/chat.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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
    private readonly chatMessageRepository: ChatMessageRepository,
    private readonly chatMessageActionRepository: ChatMessageActionRepository,
  ) {}

  async execute(chatSessionId: string, userId: string, message: string) {
    const [chatSession, lastMessage] = await Promise.all([
      this.chatRepository.findByIdAndUserId(chatSessionId, userId),
      this.chatMessageRepository.findLastMessageByChatSessionId(chatSessionId),
    ]);
    if (!chatSession) throw new NotFoundException('Chat session not found');
    const userMessage = ChatMessageEntity.create(message, 'user', 'text');
    const llmAnswer = await this.answerMessageService.execute({
      message,
      messageId: lastMessage?.values?.openAiMessageId || null,
    });
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
    await this.chatMessageRepository.saveManyMessages(chatSession.messages);
    const suggestCartResult = chatSession.messages.find(
      (msg) => msg.messageType === 'suggest_carts_result',
    );
    if (suggestCartResult) {
      const payload = llmAnswer?.action?.payload || {};
      await this.chatMessageActionRepository.save({
        chatMessageId: suggestCartResult.id,
        actionType: suggestCartResult.messageType,
        createdAt: new Date(),
        id: crypto.randomUUID(),
        payload: JSON.stringify(payload),
      });
    }
    return llmAnswerMessage.values.content;
  }
}
