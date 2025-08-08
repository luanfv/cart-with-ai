import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCartService } from '@cart/application/create-cart.service';
import {
  CreateCartBodyDtoInput,
  CreateCartDtoOutput,
} from './dto/create-cart.dto';
import { FindCartService } from '@cart/application/find-cart.service';
import { CartIdParamDtoInput, FindCartDtoOutput } from './dto/find-cart.dto';

@Controller('/api/cart')
export class CartController {
  constructor(
    private readonly createCartService: CreateCartService,
    private readonly findCartService: FindCartService,
  ) {}

  @Post()
  async createCart(
    @Body() createCartDto: CreateCartBodyDtoInput,
  ): Promise<CreateCartDtoOutput> {
    const cart = await this.createCartService.execute(
      createCartDto.userId,
      createCartDto.storeId,
    );
    return new CreateCartDtoOutput(cart.id);
  }

  @Get(':id')
  async getCart(
    @Param() params: CartIdParamDtoInput,
  ): Promise<FindCartDtoOutput> {
    const cart = await this.findCartService.execute(params.id);
    return new FindCartDtoOutput(cart.id, cart.items, cart.active);
  }
}
