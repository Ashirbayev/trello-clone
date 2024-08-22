// src/card/card.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { BoardColumn } from '../column/column.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => BoardColumn, column => column.cards)
  column: BoardColumn;

  @OneToMany(() => Comment, comment => comment.card)
  comments: Comment[];
}
