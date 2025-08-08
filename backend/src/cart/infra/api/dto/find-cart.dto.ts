import { IsNotEmpty, IsString } from 'class-validator';

export class CartIdParamDtoInput {
  @IsString()
  @IsNotEmpty()
  id: string;
}

type Items = {
  id: string;
  productId: string;
  quantity: number;
};

export class FindCartDtoOutput {
  constructor(
    readonly id: string,
    readonly items: Items[],
    readonly active: boolean,
  ) {}
}
