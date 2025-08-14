import { FindCartByUserService } from './../../application/find-cart-by-user.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCartService } from '@cart/application/create-cart.service';
import {
  CreateCartBodyDtoInput,
  CreateCartDtoOutput,
} from './dto/create-cart.dto';
import { FindCartByIdService } from '@cart/application/find-cart-by-id.service';
import { CartIdParamDtoInput, FindCartDtoOutput } from './dto/find-cart.dto';
import {
  FindCartByUserDtoOutput,
  FindCartByUserParamsDtoInput,
} from './dto/find-cart-by-user.dto';
import { AddCartItemBodyDtoInput } from './dto/add-cart-item.dto';
import { AddCartItemService } from '@cart/application/add-cart-item.service';

@Controller('/api/cart')
export class CartController {
  constructor(
    private readonly createCartService: CreateCartService,
    private readonly findCartServiceById: FindCartByIdService,
    private readonly findCartByUserService: FindCartByUserService,
    private readonly addCartItemService: AddCartItemService,
  ) {}

  @Post()
  async createCart(
    @Body() { userId, storeId, items }: CreateCartBodyDtoInput,
  ): Promise<CreateCartDtoOutput> {
    const cart = await this.createCartService.execute({
      userId,
      storeId,
      items,
    });
    return new CreateCartDtoOutput(
      cart.id,
      cart.storeId,
      cart.active,
      cart.items,
    );
  }

  @Get(':id')
  async getCart(
    @Param() params: CartIdParamDtoInput,
  ): Promise<FindCartDtoOutput> {
    const cart = await this.findCartServiceById.execute(params.id);
    return new FindCartDtoOutput(
      cart.id,
      cart.items,
      cart.active,
      cart.storeId,
    );
  }

  @Get('user/:userId')
  async getCartsByUser(
    @Param() params: FindCartByUserParamsDtoInput,
  ): Promise<FindCartByUserDtoOutput> {
    const carts = await this.findCartByUserService.execute(params.userId);
    return new FindCartByUserDtoOutput(
      params.userId,
      carts.map((cart) => ({
        id: cart.id,
        storeId: cart.storeId,
        items: cart.items,
      })),
    );
  }

  @Post('/:cartId/item')
  async addCartItem(
    @Param('cartId') cartId: string,
    @Body() { productId, quantity, userId }: AddCartItemBodyDtoInput,
  ): Promise<void> {
    await this.addCartItemService.execute(userId, cartId, productId, quantity);
  }
}
