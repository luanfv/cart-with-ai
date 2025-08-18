import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateChatSessions1755552531308 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE chat_sessions (
                id VARCHAR(46) PRIMARY KEY,
                user_id VARCHAR(46) REFERENCES users(id),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS chat_sessions;
        `);
  }
}
