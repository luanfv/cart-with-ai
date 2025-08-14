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
    const queryRunner =
      this.cartRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const cartData = {
        id: cart.id,
        userId: cart.userId,
        storeId: cart.storeId,
        active: cart.active,
      };
      await queryRunner.manager.save(Cart, cartData);
      const cartItemsData = cart.items.map((item) => ({
        id: item.id,
        cartId: cart.id,
        productId: item.productId,
        quantity: item.quantity,
      }));
      await queryRunner.manager.save(CartItem, cartItemsData);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findById(id: string): Promise<CartAggregate | null> {
    if (!id) {
      return null;
    }
    const [cartData, cartItemsData] = await Promise.all([
      this.cartRepository.findOne({
        where: { id },
      }),
      this.cartItemRepository.find({
        where: { cartId: id },
      }),
    ]);
    if (!cartData) {
      return null;
    }
    return CartAggregate.restore(
      cartData.id,
      cartData.userId,
      cartData.storeId,
      cartItemsData.map((item) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
      })),
      cartData.active,
    );
  }

  async find(
    filter: Partial<{
      id: string;
      userId: string;
      storeId: string;
      active: boolean;
    }>,
  ): Promise<CartAggregate[]> {
    const cartsData = await this.cartRepository.find({ where: filter });
    if (!cartsData || cartsData.length === 0) return [];
    const carts = await Promise.all(
      cartsData.map(async (cartData) => {
        const cartItemsData = await this.cartItemRepository.find({
          where: { cartId: cartData.id },
        });
        return CartAggregate.restore(
          cartData.id,
          cartData.userId,
          cartData.storeId,
          cartItemsData.map((item) => ({
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
          })),
          cartData.active,
        );
      }),
    );
    return carts;
  }

  async addItem(cart: CartAggregate, itemId: string): Promise<void> {
    const item = cart.items.find((i) => i.id === itemId);
    this.cartItemRepository.save({
      cartId: cart.id,
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
    });
  }
}
