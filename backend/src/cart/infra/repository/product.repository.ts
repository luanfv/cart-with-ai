import { ProductEntity } from '@cart/domain/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@shared/infra/database/entity/product.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async findManyById(ids: string[]): Promise<ProductEntity[]> {
    if (!ids || ids.length === 0) {
      return [];
    }
    const productsData = await this.repository.find({
      where: { id: In(ids) },
    });
    if (!productsData) {
      return [];
    }
    return productsData.map((productData) =>
      ProductEntity.restore(
        productData.id,
        productData.name,
        productData.price,
        productData.storeId,
        productData.embedding || [],
      ),
    );
  }
}
