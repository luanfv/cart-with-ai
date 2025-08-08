import { IsNotEmpty, IsString } from 'class-validator';

export class CartIdParamDtoInput {
  @IsString()
  @IsNotEmpty()
  id: string;
}

type Item = {
  id: string;
  productId: string;
  quantity: number;
};

export class FindCartDtoOutput {
  constructor(
    readonly id: string,
    readonly items: Item[],
    readonly active: boolean,
    readonly storeId: string,
  ) {}
}
