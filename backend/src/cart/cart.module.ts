import { Module } from '@nestjs/common';
import { CartController } from './infra/api/cart.controller';
import { CartRepository } from './infra/repository/cart.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '@shared/infra/database/entity/cart.entity';
import { CartItem } from '@shared/infra/database/entity/cart-item.entity';
import { User } from '@shared/infra/database/entity/user.entity';
import { Product } from '@shared/infra/database/entity/product.entity';
import { Store } from '@shared/infra/database/entity/store.entity';
import { CreateCartService } from './application/create-cart.service';
import { UserRepository } from './infra/repository/user.repository';
import { StoreRepository } from './infra/repository/store.repository';
import { FindCartByIdService } from './application/find-cart-by-id.service';
import { ProductRepository } from './infra/repository/product.repository';
import { FindCartByUserService } from './application/find-cart-by-user.service';
import { AddCartItemService } from './application/add-cart-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem, User, Product, Store])],
  providers: [
    CreateCartService,
    FindCartByIdService,
    FindCartByUserService,
    AddCartItemService,
    CartRepository,
    UserRepository,
    StoreRepository,
    ProductRepository,
  ],
  controllers: [CartController],
})
export class CartModule {}
