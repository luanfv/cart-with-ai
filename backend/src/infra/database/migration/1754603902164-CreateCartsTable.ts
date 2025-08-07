import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCartsTable1754603902164 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE carts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        store_id INTEGER REFERENCES stores(id),
        active BOOLEAN DEFAULT TRUE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS carts CASCADE;
    `);
  }
}
