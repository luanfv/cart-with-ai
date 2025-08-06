import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProducts1754495640161 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          price INTEGER NOT NULL,
          store_id INTEGER REFERENCES stores(id),
          embedding VECTOR(1536) -- Adjust the dimension based on your embedding model
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS products CASCADE;
    `);
  }
}
