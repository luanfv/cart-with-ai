import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreRepository } from './infra/repository/store.repository';
import { Store } from '@shared/infra/database/entity/store.entity';
import { Product } from '@shared/infra/database/entity/product.entity';
import { CatalogRepository } from './infra/repository/catalog.repository';
import { CatalogController } from './infra/api/catalog.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Product])],
  providers: [StoreRepository, CatalogRepository],
  controllers: [CatalogController],
})
export class CatalogModule {}
