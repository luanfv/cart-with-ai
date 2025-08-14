import { CartRepository } from '@cart/infra/repository/cart.repository';
import { ProductRepository } from '@cart/infra/repository/product.repository';
import { UserRepository } from '@cart/infra/repository/user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AddCartItemService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly userRepository: UserRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(
    userId: string,
    cartId: string,
    productId: string,
    quantity: number,
  ): Promise<void> {
    const [cart, user, product] = await Promise.all([
      this.cartRepository.findById(cartId),
      this.userRepository.findById(userId),
      this.productRepository.findManyById([productId]),
    ]);
    if (!cart) throw new NotFoundException('Cart not found');
    if (!user) throw new NotFoundException('User not found');
    if (!product || product.length === 0)
      throw new NotFoundException('Product not found');
    const item = cart.addItem(user, product[0], quantity);
    await this.cartRepository.addItem(cart, item.id);
  }
}
