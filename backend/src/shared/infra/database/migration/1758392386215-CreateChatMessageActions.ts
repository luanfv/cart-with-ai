import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateChatMessagesActions1758392386215
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE chat_messages_actions (
            id VARCHAR(46) PRIMARY KEY,
            chat_message_id VARCHAR(46) REFERENCES chat_messages(id),
            action_type VARCHAR(50) NOT NULL,
            payload JSONB NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            confirmed_at TIMESTAMP DEFAULT NULL,
            executed_at TIMESTAMP DEFAULT NULL,
            CONSTRAINT unique_chat_message_action UNIQUE (chat_message_id, action_type)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE chat_messages_actions;
    `);
  }
}
