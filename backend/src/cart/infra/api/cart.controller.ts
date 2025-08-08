import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CartRepository } from '../repository/cart.repository';
import { CartAggregate } from '@cart/domain/cart.aggregate';

@Controller('/api/cart')
export class CartController {
  constructor(private readonly cartRepository: CartRepository) {}

  @Post()
  async createCart(@Body() createCartDto: any): Promise<unknown> {
    const cart = CartAggregate.create(
      createCartDto.userId,
      createCartDto.storeId,
      createCartDto.items,
      true,
    );
    await this.cartRepository.create(cart);
    return {
      id: cart.id,
    };
  }

  @Get(':id')
  async getCart(@Param('id') id: string): Promise<CartAggregate | null> {
    const cart = await this.cartRepository.findById(id);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }
}
