import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../database/entity/store.entity';
import { Product } from '../database/entity/product.entity';
import { CatalogAggregate } from '../../domain/catalog.aggrega';

@Injectable()
export class CatalogRepository {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findByStoreId(storeId: number): Promise<CatalogAggregate | undefined> {
    const query = `
      SELECT
        s.id AS store_id,
        s.name AS store_name,
        p.id AS product_id,
        p.name AS product_name,
        p.price AS product_price
      FROM
        stores s
      LEFT JOIN
        products p ON s.id = p.store_id
      WHERE
        s.id = $1;
    `;

    const result = await this.storeRepository.query(query, [storeId]);

    if (!result || result.length === 0) {
      return undefined;
    }

    const catalog = CatalogAggregate.restore(
      { id: result[0].store_id, name: result[0].store_name },
      result.map((row) => ({
        id: row.product_id,
        name: row.product_name,
        price: row.product_price,
        embedding: [],
      })),
    );

    return catalog;
  }

  async findByProductName(productName: string): Promise<CatalogAggregate[]> {
    const query = `
      SELECT
        s.id AS store_id,
        s.name AS store_name,
        p.id AS product_id,
        p.name AS product_name,
        p.price AS product_price
      FROM
        stores s
      JOIN
        products p ON s.id = p.store_id
      WHERE
        p.name ILIKE $1;
    `;

    const result = await this.storeRepository.query(query, [
      `%${productName}%`,
    ]);

    if (!result || result.length === 0) {
      return [];
    }

    const catalogs: CatalogAggregate[] = result.map((row) => {
      return CatalogAggregate.restore(
        { id: row.store_id, name: row.store_name },
        [
          {
            id: row.product_id,
            name: row.product_name,
            price: row.product_price,
            embedding: [],
          },
        ],
      );
    });

    return catalogs;
  }
}
