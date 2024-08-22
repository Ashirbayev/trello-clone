import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { ColumnService } from './column.service';
import { Column } from './column.entity';

@Controller('columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post()
  async createColumn(@Body() body: { title: string; userId: number }): Promise<Column> {
    const { title, userId } = body;
    return this.columnService.createColumn(title, userId);
  }

  @Get(':id')
  async getColumnById(@Param('id') id: number): Promise<Column> {
    return this.columnService.findColumnById(id);
  }

  @Delete(':id')
  async deleteColumn(@Param('id') id: number): Promise<void> {
    return this.columnService.deleteColumn(id);
  }
}
