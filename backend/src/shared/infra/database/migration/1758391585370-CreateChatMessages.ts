import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateChatMessages1758391585370 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE chat_messages (
            id VARCHAR(46) PRIMARY KEY,
            chat_session_id VARCHAR(46) REFERENCES chat_sessions(id),
            content TEXT NOT NULL,
            sender VARCHAR(50) NOT NULL,
            openai_message_id VARCHAR(100) UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            message_type VARCHAR(50) NOT NULL
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE chat_messages;
    `);
  }
}
