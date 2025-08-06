import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
export declare class AppController {
    private readonly openAI;
    private readonly configSerivce;
    private readonly openAiModel;
    constructor(openAI: OpenAI, configSerivce: ConfigService);
    generateMessage(): Promise<{
        message: string;
    }>;
}
