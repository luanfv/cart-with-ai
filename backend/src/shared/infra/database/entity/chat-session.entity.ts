import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('chat_sessions')
export class ChatSession {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ name: 'user_id', type: 'varchar' })
  userId: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
