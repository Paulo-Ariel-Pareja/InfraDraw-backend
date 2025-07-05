import { Exclude, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Method } from '../constants/method.constants';

export class EndpointDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsEnum(Method)
  method: Method;

  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateComponentDto {
  @IsString()
  name: string;

  @IsString()
  technology: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EndpointDto)
  endpoints: EndpointDto[];
}
