import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '@shared/infra/database/entity/cart.entity';
import { CartItem } from '@shared/infra/database/entity/cart-item.entity';
import { CartAggregate } from '@cart/domain/cart.aggregate';

@Injectable()
export class CartRepository {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async create(cart: CartAggregate): Promise<void> {
    const cartData = {
      id: cart.id,
      userId: cart.userId,
      storeId: cart.storeId,
      active: cart.active,
    };
    await this.cartRepository.save(cartData);
  }

  async findById(cartId: string): Promise<CartAggregate | null> {
    const cartData = await this.cartRepository.findOne({
      where: { id: cartId },
    });
    if (!cartData) {
      return null;
    }
    return CartAggregate.restore(
      cartData.id,
      cartData.userId,
      cartData.storeId,
      [],
      cartData.active,
    );
  }
}
