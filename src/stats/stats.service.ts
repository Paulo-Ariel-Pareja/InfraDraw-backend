import { Injectable } from '@nestjs/common';
import { BoardService } from '../board/board.service';
import { ComponentService } from '../component/component.service';
import { mergeStats } from './helper/merge.helper';
import { SequenceDiagramService } from '../sequence-diagram/sequence-diagram.service';

@Injectable()
export class StatsService {
  constructor(
    private readonly boardService: BoardService,
    private readonly componentService: ComponentService,
    private readonly diagramService: SequenceDiagramService,
  ) {}
  async stats() {
    const boardStats = await this.boardService.boardStats();
    const componentStats = await this.componentService.componentStats();
    const diagramas = await this.diagramService.diagramStats();
    return mergeStats({ boardStats, componentStats, diagramas });
  }
}
