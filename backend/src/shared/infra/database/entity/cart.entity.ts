import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('carts')
export class Cart {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ name: 'user_id', type: 'varchar' })
  userId: string;

  @Column({ name: 'store_id', type: 'varchar' })
  storeId: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
