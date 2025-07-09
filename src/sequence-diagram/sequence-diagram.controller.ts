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
import { SequenceDiagramService } from './sequence-diagram.service';
import { CreateSequenceDiagramDto } from './dto/create-sequence-diagram.dto';
import { SearchDto } from '../common/dto/search.dto';
import { UpdateSequenceDiagramDto } from './dto/update-sequence-diagram.dto';
import { JwtAuthGuard } from '../common/guard/jwt-auth.guard';

@Controller('sequence-diagram')
export class SequenceDiagramController {
  constructor(
    private readonly sequenceDiagramService: SequenceDiagramService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateSequenceDiagramDto) {
    return this.sequenceDiagramService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() searchCriteria: SearchDto) {
    return this.sequenceDiagramService.findAll(searchCriteria);
  }

  @Get('public')
  findAllPublic(@Query() searchCriteria: SearchDto) {
    return this.sequenceDiagramService.findAllPublic(searchCriteria);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sequenceDiagramService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateSequenceDiagramDto) {
    return this.sequenceDiagramService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sequenceDiagramService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/toggle')
  toggle(@Param('id') id: string) {
    return this.sequenceDiagramService.toggle(id);
  }
}
