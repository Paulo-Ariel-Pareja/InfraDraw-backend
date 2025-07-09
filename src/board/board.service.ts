import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { transform } from './helper/board.helper';
import { SearchDto } from '../common/dto/search.dto';
import { Order } from '../common/constants/order.constant';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name)
    private dbBoard: PaginateModel<Board>,
  ) {}

  async create(body: CreateBoardDto) {
    try {
      const newBoard = await this.dbBoard.create(body);
      return transform(newBoard);
    } catch (error) {
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
    const results = await this.dbBoard.paginate(filters, { ...options, sort });
    const { docs, page, limit, totalPages, totalDocs } = results;
    const boards: Board[] = [];
    if (docs.length != 0) {
      const boardsTransformed = docs.map((item) => {
        return transform(item);
      });
      boards.push(...boardsTransformed);
    }

    return {
      boards,
      total: totalDocs,
      page,
      limit,
      totalPages,
    };
  }

  async findAllPublic(searchCriteria: SearchDto) {
    const { search, ...options } = searchCriteria;

    const filters = {
      $or: [
        { name: { $regex: search || '', $options: 'i' }, isPublic: true },
        {
          description: { $regex: search || '', $options: 'i' },
          isPublic: true,
        },
      ],
    };
    const results = await this.dbBoard.paginate(filters, options);
    const { docs, page, limit, totalPages, totalDocs } = results;
    const boards: Board[] = [];
    if (docs.length != 0) {
      const boardsTransformed = docs.map((item) => {
        return transform(item);
      });
      boards.push(...boardsTransformed);
    }

    return {
      boards,
      total: totalDocs,
      page,
      limit,
      totalPages,
    };
  }

  async findOne(id: string) {
    const result = await this.dbBoard.findOne({ _id: id });
    if (!result) throw new NotFoundException(`board ${id} not found`);
    return transform(result);
  }

  async update(id: string, body: UpdateBoardDto) {
    const exist = await this.dbBoard.findOne({ _id: id });
    if (!exist) throw new NotFoundException(`board ${id} not found`);
    const result = await this.dbBoard.findOneAndUpdate(
      { _id: id },
      { ...body, updatedAt: Date.now() },
      { new: true },
    );
    return transform(result);
  }

  async remove(id: string) {
    await this.dbBoard.deleteOne({ _id: id });
    return;
  }

  async toggle(id: string) {
    const exist = await this.dbBoard.findOne({ _id: id });
    if (!exist) throw new NotFoundException(`board ${id} not found`);
    const body = { isPublic: !exist.isPublic };
    const result = await this.dbBoard.findOneAndUpdate(
      { _id: id },
      { ...body },
      { new: true },
    );
    return transform(result);
  }

  async boardStats() {
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
    const results = await this.dbBoard.aggregate([
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
}
