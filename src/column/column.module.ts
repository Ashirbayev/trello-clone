import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Column } from './column.entity';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Column])],
  providers: [ColumnService],
  controllers: [ColumnController],
  exports: [ColumnService],
})
export class ColumnModule {}
