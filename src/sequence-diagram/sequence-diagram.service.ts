import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { CreateSequenceDiagramDto } from './dto/create-sequence-diagram.dto';
import { SequenceDiagram } from './entities/sequence-diagram.entity';
import { SearchDto } from '../common/dto/search.dto';
import { Order } from '../common/constants/order.constant';
import { UpdateSequenceDiagramDto } from './dto/update-sequence-diagram.dto';
import { transform } from './helper/sequence-diagram.helper';

@Injectable()
export class SequenceDiagramService {
  constructor(
    @InjectModel(SequenceDiagram.name)
    private dbSequence: PaginateModel<SequenceDiagram>,
  ) {}

  async create(body: CreateSequenceDiagramDto) {
    try {
      const newBoard = await this.dbSequence.create(body);
      return transform(newBoard);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(searchCriteria: SearchDto) {
    const { search, order, ...options } = searchCriteria;
    let sort = {};
    switch (order) {
      case Order.DESC:
        sort = { updatedAt: -1 };
        break;
      case Order.ASC:
      default:
        sort = { updatedAt: 1 };
        break;
    }
    const filters = {
      $or: [
        { name: { $regex: search || '', $options: 'i' } },
        { description: { $regex: search || '', $options: 'i' } },
      ],
    };
    const results = await this.dbSequence.paginate(filters, {
      ...options,
      sort,
    });
    const { docs, page, limit, totalPages, totalDocs } = results;
    const diagrams: SequenceDiagram[] = [];
    if (docs.length != 0) {
      const diagramsTransformed = docs.map((item) => {
        return transform(item);
      });
      diagrams.push(...diagramsTransformed);
    }

    return {
      diagrams,
      total: totalDocs,
      page,
      limit,
      totalPages,
    };
  }

  async findOne(id: string) {
    const result = await this.dbSequence.findOne({ _id: id });
    if (!result) throw new NotFoundException(`diagram ${id} not found`);
    return transform(result);
  }

  async update(id: string, body: UpdateSequenceDiagramDto) {
    const exist = await this.dbSequence.findOne({ _id: id });
    if (!exist) throw new NotFoundException(`board ${id} not found`);
    const result = await this.dbSequence.findOneAndUpdate(
      { _id: id },
      { ...body, updatedAt: Date.now() },
      { new: true },
    );
    return transform(result);
  }

  async remove(id: string) {
    await this.dbSequence.deleteOne({ _id: id });
    return;
  }

  async toggle(id: string) {
    const exist = await this.dbSequence.findOne({ _id: id });
    if (!exist) throw new NotFoundException(`board ${id} not found`);
    const body = { isPublic: !exist.isPublic };
    const result = await this.dbSequence.findOneAndUpdate(
      { _id: id },
      { ...body },
      { new: true },
    );
    return transform(result);
  }

  async diagramStats() {
    const limit = dayjs().subtract(7, 'days');
    const day = limit.get('d');
    const month = limit.get('M');
    const year = limit.get('y');
    const dateWithLocalTZ = new Date(year, month, day);
    const dateWithoutTZ = dateWithLocalTZ
      .toISOString()
      .split('T')[0]
      .concat('T00:00:00.000Z');
    const dateFilter = new Date(dateWithoutTZ);
    const results = await this.dbSequence.aggregate([
      { $match: { updatedAt: { $gte: dateFilter } } },
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                date: '$updatedAt',
                format: '%Y-%m-%d',
              },
            },
          },
          count: { $sum: 1 },
        },
      },
    ]);
    return results.map((b) => {
      const { count, _id } = b;
      return {
        count,
        date: _id.date,
      };
    });
  }

  async findAllPublic(searchCriteria: SearchDto) {
    const { search, order, ...options } = searchCriteria;

    const filters = {
      $or: [
        { name: { $regex: search || '', $options: 'i' }, isPublic: true },
        {
          description: { $regex: search || '', $options: 'i' },
          isPublic: true,
        },
      ],
    };
    const results = await this.dbSequence.paginate(filters, options);
    const { docs, page, limit, totalPages, totalDocs } = results;
    const diagrams: SequenceDiagram[] = [];
    if (docs.length != 0) {
      const diagramsTransformed = docs.map((item) => {
        return transform(item);
      });
      diagrams.push(...diagramsTransformed);
    }

    return {
      diagrams,
      total: totalDocs,
      page,
      limit,
      totalPages,
    };
  }
}
