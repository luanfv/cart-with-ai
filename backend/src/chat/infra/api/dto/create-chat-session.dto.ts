import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatSessionBodyDtoInput {
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class CreateChatSessionDtoOutput {
  constructor(readonly id: string) {}
}
