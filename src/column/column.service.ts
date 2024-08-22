import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Column } from './column.entity';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(Column)
    private columnRepository: Repository<Column>,
  ) {}

  async createColumn(title: string, userId: number): Promise<Column> {
    const column = this.columnRepository.create({ title, user: { id: userId } });
    return this.columnRepository.save(column);
  }

  async findColumnById(id: number): Promise<Column> {
    return this.columnRepository.findOne({ where: { id }, relations: ['user', 'cards'] });
  }

  async deleteColumn(id: number): Promise<void> {
    await this.columnRepository.delete(id);
  }
}
