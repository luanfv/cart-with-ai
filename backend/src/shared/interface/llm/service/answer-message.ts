export class AnswerMessageInput {
  constructor(
    readonly message: string,
    readonly messageId?: string,
  ) {}
}

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
  execute(input: AnswerMessageInput): Promise<AnswerMessageOutput>;
}

export const OPENAI_ANSWER_MESSAGE_SERVICE_PROVIDER = Symbol(
  'OPENAI_ANSWER_MESSAGE_SERVICE_PROVIDER',
);
