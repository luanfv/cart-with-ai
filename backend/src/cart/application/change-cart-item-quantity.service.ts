import { CartRepository } from '@cart/infra/repository/cart.repository';
import { UserRepository } from '@cart/infra/repository/user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ChangeCartItemQuantityService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    userId: string,
    cartId: string,
    cartItemId: string,
    quantity: number,
  ): Promise<void> {
    const [cart, user] = await Promise.all([
      this.cartRepository.findById(cartId),
      this.userRepository.findById(userId),
    ]);
    if (!cart) throw new NotFoundException('Cart not found');
    if (!user) throw new NotFoundException('User not found');
    cart.changeItemQuantity(user, cartItemId, quantity);
    this.cartRepository.updateItem(cart, cartItemId);
  }
}
