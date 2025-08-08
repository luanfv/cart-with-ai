import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from '@shared/infra/database/entity/product.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ name: 'cart_id', type: 'varchar' })
  cartId: string;

  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  productId: string;

  @Column({ type: 'integer', default: 1 })
  quantity: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
