export class AnswerMessageOutput {
  constructor(
    readonly responseId: string,
    readonly message?: string,
    readonly action?:
      | {
          type?: 'send_message';
        }
      | {
          type?: 'suggest_carts';
          payload?: {
            input?: string;
          };
        },
  ) {}
}

export interface IAnswerMessageService {
  execute(message: string): Promise<AnswerMessageOutput>;
}

export const OPENAI_ANSWER_MESSAGE_SERVICE_PROVIDER = Symbol(
  'OPENAI_ANSWER_MESSAGE_SERVICE_PROVIDER',
);
