import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { SearchDto } from '../common/dto/search.dto';
import { Order } from '../common/constants/order.constant';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @Get()
  findAll(@Query() searchCriteria: SearchDto) {
    return this.boardService.findAll(searchCriteria);
  }

  @Get('recent')
  async findRecent() {
    const searchCriteria: SearchDto = {
      order: Order.DESC,
      limit: 3,
      page: 1,
    };
    const result = await this.boardService.findAll(searchCriteria);
    return result.boards.map((b) => {
      const { id, name, updatedAt } = b;
      return { id, name, updatedAt };
    });
  }

  @Get('public')
  findAllPublic(@Query() searchCriteria: SearchDto) {
    return this.boardService.findAllPublic(searchCriteria);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(id);
  }

  @Patch(':id/toggle')
  toggle(@Param('id') id: string) {
    return this.boardService.toggle(id);
  }
}
