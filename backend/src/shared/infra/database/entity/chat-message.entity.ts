import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('chat_messages')
export class ChatMessage {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ name: 'chat_session_id', type: 'varchar' })
  chatSessionId: string;

  @Column({ name: 'content', type: 'text' })
  content: string;

  @Column({ name: 'sender', type: 'varchar' })
  sender: string;

  @Column({ name: 'openai_message_id', type: 'varchar', nullable: true })
  openAiMessageId?: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ name: 'message_type', type: 'varchar' })
  messageType: string;
}
