import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'stores',
})
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
