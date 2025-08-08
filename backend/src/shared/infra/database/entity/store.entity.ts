import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('stores')
export class Store {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column()
  name: string;
}
