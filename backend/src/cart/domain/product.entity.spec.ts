import { ProductEntity } from './product.entity';

describe('ProductEntity unit tests', () => {
  describe('WHEN call the ProductEntity restore', () => {
    const id = 'prod-1';
    const name = 'Product 1';
    const price = 100;
    const storeId = 'store-1';
    const embedding = [0.1, 0.2, 0.3];
    const product = ProductEntity.restore(id, name, price, storeId, embedding);

    it('SHOULD restore with correct id', () => {
      expect(product.id).toEqual(id);
    });

    it('SHOULD restore with correct storeId', () => {
      expect(product.storeId).toEqual(storeId);
    });
  });
});
