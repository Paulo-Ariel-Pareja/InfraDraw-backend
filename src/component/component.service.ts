import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { Component } from './entities/component.entity';
import { transform } from './helper/component.helper';
import { SearchDto } from '../common/dto/search.dto';

@Injectable()
export class ComponentService {
  constructor(
    @InjectModel(Component.name)
    private dbComponent: PaginateModel<Component>,
  ) {}

  async create(body: CreateComponentDto) {
    try {
      const newElement = await this.dbComponent.create(body);
      return transform(newElement);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(searchCriteria: SearchDto) {
    const { search, ...options } = searchCriteria;
    const filters = {
      $or: [
        { name: { $regex: search || '', $options: 'i' } },
        { technology: { $regex: search || '', $options: 'i' } },
      ],
    };
    const results = await this.dbComponent.paginate(filters, options);
    const { docs, page, limit, totalPages, totalDocs } = results;
    const components: Component[] = [];
    if (docs.length != 0) {
      const componentsTransformed = docs.map((item) => {
        return transform(item);
      });
      components.push(...componentsTransformed);
    }
    return {
      components,
      total: totalDocs,
      page,
      limit,
      totalPages,
    };
  }

  async findOne(id: string) {
    const result = await this.dbComponent.findOne({ _id: id });

    return transform(result);
  }

  async update(id: string, body: UpdateComponentDto) {
    const exists = await this.dbComponent.findOne({ _id: id });
    if (!exists) throw new BadRequestException('Component not found');
    const updated = await this.dbComponent.findOneAndUpdate(
      { _id: id },
      { ...body, updatedAt: Date.now() },
      { new: true },
    );
    return transform(updated);
  }

  async remove(id: string) {
    await this.dbComponent.deleteOne({ _id: id });
    return;
  }

  async componentStats() {
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
    const results = await this.dbComponent.aggregate([
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
