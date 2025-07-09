import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { BoardService } from '../board/board.service';
import { SequenceDiagramService } from '../sequence-diagram/sequence-diagram.service';
import { ComponentService } from 'src/component/component.service';
import { Board, BoardSchema } from '../board/entities/board.entity';
import {
  Component,
  ComponentSchema,
} from '../component/entities/component.entity';
import {
  SequenceDiagram,
  SequenceDiagramSchema,
} from 'src/sequence-diagram/entities/sequence-diagram.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Board.name, schema: BoardSchema },
      { name: Component.name, schema: ComponentSchema },
      { name: SequenceDiagram.name, schema: SequenceDiagramSchema },
    ]),
  ],
  controllers: [StatsController],
  providers: [
    StatsService,
    BoardService,
    ComponentService,
    SequenceDiagramService,
  ],
})
export class StatsModule {}
