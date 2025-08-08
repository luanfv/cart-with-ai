import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column()
  name: string;

  @Column('int')
  price: number;

  @Column({ name: 'store_id', type: 'varchar' })
  storeId: string;

  @Column('simple-json', { nullable: true })
  embedding?: number[];
}
