import { CartAggregate } from '@cart/domain/cart.aggregate';
import { CartRepository } from '@cart/infra/repository/cart.repository';
import { ProductRepository } from '@cart/infra/repository/product.repository';
import { StoreRepository } from '@cart/infra/repository/store.repository';
import { UserRepository } from '@cart/infra/repository/user.repository';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

type CreateCartInput = {
  userId: string;
  storeId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
};

@Injectable()
export class CreateCartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly userRepository: UserRepository,
    private readonly storeRepository: StoreRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute({
    userId,
    storeId,
    items,
  }: CreateCartInput): Promise<CartAggregate> {
    const cartByUserAndStore =
      await this.cartRepository.findByUserIdAndStoreIdAndActive(
        userId,
        storeId,
        true,
      );
    if (cartByUserAndStore) {
      throw new UnprocessableEntityException(
        'Cart already exists for user and store',
      );
    }
    const [user, store, products] = await Promise.all([
      this.userRepository.findById(userId),
      this.storeRepository.findById(storeId),
      this.productRepository.findManyById(items.map((item) => item.productId)),
    ]);
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);
    if (!store)
      throw new NotFoundException(`Store with id ${storeId} not found`);
    if (products.length !== items.length) {
      throw new NotFoundException(`Not found all products in store ${storeId}`);
    }
    const cart = CartAggregate.create(
      user,
      store,
      products.map((product) => ({
        product,
        quantity:
          items.find((item) => item.productId === product.id)?.quantity || 0,
      })),
      true,
    );
    await this.cartRepository.create(cart);
    return cart;
  }
}
