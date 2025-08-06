import { ProductEntity } from './entity/product.entity';
import { StoreEntity } from './entity/store.entity';

type StoreParams = {
  id: number;
  name: string;
};

type ProductParams = {
  id: number;
  name: string;
  price: number;
  embedding: number[];
};

export class CatalogAggregate {
  private _store: StoreEntity;
  private _products: ProductEntity[];

  static restore(store: StoreParams, products: ProductParams[]) {
    const instance = new CatalogAggregate();
    instance._store = StoreEntity.restore(store.id, store.name);
    instance._products = products.map((product) =>
      ProductEntity.restore(
        product.id,
        product.name,
        product.price,
        product.embedding,
      ),
    );
    return instance;
  }

  get values() {
    return {
      store: this._store.name,
      products: this._products.map((product) => ({
        name: product.name,
        price: product.price,
      })),
    };
  }
}
