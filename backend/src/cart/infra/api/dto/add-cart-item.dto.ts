import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddCartItemBodyDtoInput {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
