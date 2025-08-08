import { CartAggregate } from '@cart/domain/cart.aggregate';
import { CartRepository } from '@cart/infra/repository/cart.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindCartByIdService {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(cartId: string): Promise<CartAggregate> {
    const cart = await this.cartRepository.findById(cartId);
    if (!cart) throw new NotFoundException(`Cart with id ${cartId} not found`);
    return cart;
  }
}
