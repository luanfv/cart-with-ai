import { StoreEntity } from './store.entity';

describe('StoreEntity unit tests', () => {
  describe('WHEN call the StoreEntity restore', () => {
    const id = 'store-1';
    const name = 'Store 1';
    const store = StoreEntity.restore(id, name);

    it('SHOULD restore with correct id', () => {
      expect(store.id).toEqual(id);
    });
  });
});
