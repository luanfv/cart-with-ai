import { randomUUID } from 'node:crypto';
import { ProductEntity } from './entity/product.entity';
import { StoreEntity } from './entity/store.entity';

type StoreParams = {
  id: string;
  name: string;
};

type ProductParams = {
  id: string;
  name: string;
  price: number;
  embedding: number[];
};

export class CatalogAggregate {
  private _id: string;
  private _store: StoreEntity;
  private _products: ProductEntity[];

  private constructor(
    id: string,
    store: StoreEntity,
    products: ProductEntity[],
  ) {
    this._id = id;
    this._store = store;
    this._products = products;
  }

  static restore(store: StoreParams, products: ProductParams[]) {
    return new CatalogAggregate(
      randomUUID(),
      StoreEntity.restore(store.id, store.name),
      products.map((product) =>
        ProductEntity.restore(
          product.id,
          product.name,
          product.price,
          product.embedding,
        ),
      ),
    );
  }

  get values() {
    return {
      store: {
        name: this._store.name,
        id: this._store.id,
      },
      products: this._products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
