import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ChangeCartItemQuantityDtoInput {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
