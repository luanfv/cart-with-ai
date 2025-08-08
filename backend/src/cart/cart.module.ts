import { Module } from '@nestjs/common';
import { CartController } from './infra/api/cart.controller';
import { CartRepository } from './infra/repository/cart.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '@shared/infra/database/entity/cart.entity';
import { CartItem } from '@shared/infra/database/entity/cart-item.entity';
import { User } from '@shared/infra/database/entity/user.entity';
import { Product } from '@shared/infra/database/entity/product.entity';
import { Store } from '@shared/infra/database/entity/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem, User, Product, Store])],
  providers: [CartRepository],
  controllers: [CartController],
})
export class CartModule {}
