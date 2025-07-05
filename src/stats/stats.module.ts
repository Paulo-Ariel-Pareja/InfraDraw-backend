import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { BoardService } from '../board/board.service';
import { ComponentService } from 'src/component/component.service';
import { Board, BoardSchema } from '../board/entities/board.entity';
import {
  Component,
  ComponentSchema,
} from '../component/entities/component.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Board.name, schema: BoardSchema },
      { name: Component.name, schema: ComponentSchema },
    ]),
  ],
  controllers: [StatsController],
  providers: [StatsService, BoardService, ComponentService],
})
export class StatsModule {}
