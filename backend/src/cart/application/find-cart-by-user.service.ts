import { CartAggregate } from '@cart/domain/cart.aggregate';
import { CartRepository } from '@cart/infra/repository/cart.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindCartByUserService {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(userId: string): Promise<CartAggregate[]> {
    const carts = await this.cartRepository.find({ userId, active: true });
    if (!carts) return [];
    return carts;
  }
}
