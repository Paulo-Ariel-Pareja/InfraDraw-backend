import { Injectable } from '@nestjs/common';
import { BoardService } from '../board/board.service';
import { ComponentService } from '../component/component.service';
import { mergeStats } from './helper/merge.helper';

@Injectable()
export class StatsService {
  constructor(
    private readonly boardService: BoardService,
    private readonly componentService: ComponentService,
  ) {}
  async stats() {
    const boardStats = await this.boardService.boardStats();
    const componentStats = await this.componentService.componentStats();
    return mergeStats({ boardStats, componentStats });
  }
}
