import {
  IsOptional,
  IsPositive,
  IsNumber,
  Min,
  IsString,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Order } from '../constants/order.constant';

export class SearchDto {
  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  limit?: number = 6;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsString()
  search?: string;

  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;
}
