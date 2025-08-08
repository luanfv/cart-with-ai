import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStores1754495513195 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE stores (
          id VARCHAR(46) PRIMARY KEY,
          name VARCHAR(255) NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS stores CASCADE;
    `);
  }
}
