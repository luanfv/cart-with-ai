import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCartItemsTable1754603912089 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE cart_items (
        id VARCHAR(46) PRIMARY KEY,
        cart_id VARCHAR(46) REFERENCES carts(id),
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_cart_product UNIQUE (cart_id, product_id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS cart_items CASCADE;
    `);
  }
}
