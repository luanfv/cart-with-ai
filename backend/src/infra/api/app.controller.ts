import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Controller('/api')
export class AppController {
  private readonly openAiModel: string;

  constructor(
    private readonly openAI: OpenAI,
    private readonly configSerivce: ConfigService,
  ) {
    this.openAiModel = this.configSerivce.getOrThrow<string>('OPEN_AI_MODEL');
  }

  @Get()
  async generateMessage() {
    const response = await this.openAI.responses.create({
      model: this.openAiModel,
      input: 'Diga uma frase bem legal em português. No máximo 10 palavras.',
      max_output_tokens: 20,
    });
    return { message: response.output_text };
  }
}
