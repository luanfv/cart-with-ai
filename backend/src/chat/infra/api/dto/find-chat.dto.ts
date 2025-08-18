import { IsNotEmpty, IsString } from 'class-validator';

export class FindChatParamDtoInput {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class FindChatDtoOutput {
  constructor(
    readonly id: string,
    readonly userId: string,
    readonly createdAt: Date,
  ) {}
}
