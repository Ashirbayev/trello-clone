import { Entity, PrimaryGeneratedColumn, Column as OrmColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Card } from '../card/card.entity';

@Entity()
export class BoardColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @OrmColumn()
  name: string;

  @ManyToOne(() => User, user => user.boardColumns)
  user: User;

  @OneToMany(() => Card, card => card.column)
  cards: Card[];
}
