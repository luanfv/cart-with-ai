import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveCartItemBodyDtoInput {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
