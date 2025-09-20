import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OPENAI_ANSWER_MESSAGE_SERVICE_PROVIDER } from '@shared/interface/llm/service/answer-message';
import OpenAI from 'openai';
import { OpenAIAnswerMessageService } from './service/openai-answer-message.service';

@Global()
@Module({
  providers: [
    {
      provide: OpenAI,
      useFactory: (configService: ConfigService) =>
        new OpenAI({
          apiKey: configService.getOrThrow<string>('OPEN_AI_KEY'),
        }),
      inject: [ConfigService],
    },
    {
      provide: OPENAI_ANSWER_MESSAGE_SERVICE_PROVIDER,
      useClass: OpenAIAnswerMessageService,
    },
  ],
  exports: [
    OpenAI,
    {
      provide: OPENAI_ANSWER_MESSAGE_SERVICE_PROVIDER,
      useClass: OpenAIAnswerMessageService,
    },
  ],
})
export class LlmModule {}
