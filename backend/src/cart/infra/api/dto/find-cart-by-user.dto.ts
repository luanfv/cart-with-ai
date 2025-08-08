import { IsNotEmpty, IsString } from 'class-validator';

export class FindCartByUserParamsDtoInput {
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class FindCartByUserDtoOutput {
  constructor(
    readonly userId: string,
    readonly carts: {
      id: string;
      storeId: string;
      items: {
        productId: string;
        quantity: number;
      }[];
    }[],
  ) {}
}
