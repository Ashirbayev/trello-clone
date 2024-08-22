import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BoardColumn } from '../column/column.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => BoardColumn, column => column.user)
  boardColumns: BoardColumn[];
}
