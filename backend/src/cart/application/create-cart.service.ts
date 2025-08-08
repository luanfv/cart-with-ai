import { CartAggregate } from '@cart/domain/cart.aggregate';
import { CartRepository } from '@cart/infra/repository/cart.repository';
import { StoreRepository } from '@cart/infra/repository/store.repository';
import { UserRepository } from '@cart/infra/repository/user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CreateCartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly userRepository: UserRepository,
    private readonly storeRepository: StoreRepository,
  ) {}

  async execute(userId: string, storeId: string): Promise<CartAggregate> {
    const [user, store] = await Promise.all([
      this.userRepository.findById(userId),
      this.storeRepository.findById(storeId),
    ]);
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);
    if (!store)
      throw new NotFoundException(`Store with id ${storeId} not found`);
    const cart = CartAggregate.create(user, store, [], true);
    await this.cartRepository.create(cart);
    return cart;
  }
}
