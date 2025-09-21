import { Injectable } from '@nestjs/common';
import {
  AnswerMessageInput,
  AnswerMessageOutput,
  IAnswerMessageService,
} from '@shared/interface/llm/service/answer-message';
import { OpenAI } from 'openai';
import { zodTextFormat } from 'openai/helpers/zod.js';
import z from 'zod';

const answerMessageSchema = z.object({
  message: z.string(),
  action: z.discriminatedUnion('type', [
    z.object({
      type: z.literal('send_message'),
    }),
    z.object({
      type: z.literal('suggest_carts'),
      payload: z.object({
        input: z.string(),
      }),
    }),
  ]),
});

@Injectable()
export class OpenAIAnswerMessageService implements IAnswerMessageService {
  private readonly ANSWER_MESSAGE_PROMPT = `
    Você é um assistente de um marketplace com conhecimentos gastronômicos. Identifique qual ação o usuário está solicitando:
    - 'send_message': Use essa ação para responder o usuário antes de commitar alguma ação. Caso o usuário tenha solicitado uma ação, mas você ainda precise de mais informações, use essa ação para perguntar ao usuário. Informe em "message" a resposta do assistente.
    - 'suggest_carts': Use essa ação apenas quando já tiver todas as informações necessárias para sugerir um carrinho de compras. Informe em "input" uma descrição do que o usuário está solicitando, junto a uma lista de produtos que você sugeriria para o carrinho. A mensagem que acompanha essa ação deve ser uma confirmação para o usuário, perguntando se ele confirma a ação de montar o carrinho de compras.

    Exemplo:
        - Mensagem do usuário: "Montar carrinho para receita de bolo de chocolate"
        - Resposta do assistente: "Você solicitou um bolo de chocolate. Confirma a ação para que possa montar o carrinho de compras?"
        - Input: "Bolo de chocolate. Ingredientes: farinha, açúcar, ovos, chocolate meio amargo, fermento em pó."

    Não use a ação 'suggest_carts' para responder ao usuário, apenas para sugerir um carrinho de compras. Use a ação 'send_message' para responder ao usuário.
    Não precisa ir muito afundo em detalhes, se o usuário solicitar um bolo de chocolate, você pode sugerir um carrinho com ingredientes básicos, ao invés de perguntar se ele prefere chocolate meio amargo ou ao leite ou pedir detalhes sobre a receita, pois o usuário pode inserir esses detalhes depois.
  `;

  constructor(private openai: OpenAI) {}

  async execute(input: AnswerMessageInput): Promise<AnswerMessageOutput> {
    try {
      console.log('input', input);
      const response = await this.openai.responses.parse({
        model: 'gpt-4.1-nano',
        previous_response_id: input.messageId ?? null,
        instructions: this.ANSWER_MESSAGE_PROMPT,
        input: input.message,
        text: {
          format: zodTextFormat(answerMessageSchema, 'answerSchema'),
        },
      });
      if (!response.output_parsed) return null;
      return new AnswerMessageOutput(
        response.id,
        response.output_parsed.message,
        response.output_parsed.action,
      );
    } catch {
      return null;
    }
  }
}
