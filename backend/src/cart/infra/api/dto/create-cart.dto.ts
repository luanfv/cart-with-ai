import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCartBodyDtoInput {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  storeId: string;
}

export class CreateCartDtoOutput {
  constructor(readonly id: string) {}
}
