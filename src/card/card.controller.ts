import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from './card.entity';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  async createCard(@Body() body: { title: string; columnId: number }): Promise<Card> {
    const { title, columnId } = body;
    return this.cardService.createCard(title, columnId);
  }

  @Get(':id')
  async getCardById(@Param('id') id: number): Promise<Card> {
    return this.cardService.findCardById(id);
  }

  @Delete(':id')
  async deleteCard(@Param('id') id: number): Promise<void> {
    return this.cardService.deleteCard(id);
  }
}
