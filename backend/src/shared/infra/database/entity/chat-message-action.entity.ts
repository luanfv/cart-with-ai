import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('chat_messages_actions')
export class ChatMessageAction {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ name: 'chat_message_id', type: 'varchar' })
  chatMessageId: string;

  @Column({ name: 'action_type', type: 'varchar' })
  actionType: string;

  @Column({ name: 'payload', type: 'jsonb' })
  payload: any;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ name: 'confirmed_at', type: 'timestamp', nullable: true })
  confirmedAt?: Date;

  @Column({ name: 'executed_at', type: 'timestamp', nullable: true })
  executedAt?: Date;
}
