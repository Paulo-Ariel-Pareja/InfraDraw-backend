import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { SearchDto } from '../common/dto/search.dto';
import { Order } from '../common/constants/order.constant';
import { JwtAuthGuard } from '../common/guard/jwt-auth.guard';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() searchCriteria: SearchDto) {
    return this.boardService.findAll(searchCriteria);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(id, updateBoardDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/toggle')
  toggle(@Param('id') id: string) {
    return this.boardService.toggle(id);
  }
}
