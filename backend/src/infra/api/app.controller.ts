import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { StoreRepository } from '../repository/store.repository';

@Controller('/api')
export class AppController {
  private readonly openAiModel: string;

  constructor(
    private readonly openAI: OpenAI,
    private readonly configSerivce: ConfigService,
    @Inject(StoreRepository)
    private readonly storeRepository: StoreRepository,
  ) {
    this.openAiModel = this.configSerivce.getOrThrow<string>('OPEN_AI_MODEL');
  }

  @Get('/message')
  async generateMessage() {
    const response = await this.openAI.responses.create({
      model: this.openAiModel,
      input: 'Diga uma frase bem legal em português. No máximo 10 palavras.',
      max_output_tokens: 20,
    });
    return { message: response.output_text };
  }

  @Get('/stores')
  async getStores() {
    const stores = await this.storeRepository.getAll();
    return { stores };
  }
}
