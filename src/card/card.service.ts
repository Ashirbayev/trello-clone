import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  async createCard(title: string, columnId: number): Promise<Card> {
    const card = this.cardRepository.create({ title, column: { id: columnId } });
    return this.cardRepository.save(card);
  }

  async findCardById(id: number): Promise<Card> {
    return this.cardRepository.findOne({ where: { id }, relations: ['column', 'comments'] });
  }

  async deleteCard(id: number): Promise<void> {
    await this.cardRepository.delete(id);
  }
}
