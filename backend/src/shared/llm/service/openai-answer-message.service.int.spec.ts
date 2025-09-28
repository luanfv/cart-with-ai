import { Test, TestingModule } from '@nestjs/testing';
import { LlmModule } from '../llm.module';
import {
  IAnswerMessageService,
  OPENAI_ANSWER_MESSAGE_SERVICE_PROVIDER,
} from '@shared/interface/llm/service/answer-message';
import { ConfigModule } from '@nestjs/config';

describe('OpenAIAnswerMessageService integration tests', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        LlmModule,
      ],
    }).compile();
    await module.init();
  });

  describe('WHEN send a message without details', () => {
    it('SHOULD return a send_message type', async () => {
      const openaiService = module.get<IAnswerMessageService>(
        OPENAI_ANSWER_MESSAGE_SERVICE_PROVIDER,
      );
      const response = await openaiService.execute({ message: 'oi' });
      expect(response).toEqual(
        expect.objectContaining({
          responseId: expect.any(String),
          message: expect.any(String),
          action: {
            type: 'send_message',
          },
        }),
      );
    });
  });

  describe('WHEN send a message with details', () => {
    it('SHOULD return a suggest_carts type', async () => {
      const openaiService = module.get<IAnswerMessageService>(
        OPENAI_ANSWER_MESSAGE_SERVICE_PROVIDER,
      );
      const response = await openaiService.execute({
        message: 'o que preciso para fazer um bolo de chocolate?',
      });
      expect(response).toEqual(
        expect.objectContaining({
          responseId: expect.any(String),
          message: expect.any(String),
          action: {
            type: 'suggest_carts',
            payload: {
              input: expect.any(String),
            },
          },
        }),
      );
    });
  });
});
