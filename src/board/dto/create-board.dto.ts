import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateComponentDto } from '../../component/dto/create-component.dto';
import { RelationshipType } from '../constants/relationship-type.constants';
import { Type } from 'class-transformer';
import { DiagramNodeType } from '../constants/diagram-node-type.constants';

class ComponentForBoard extends CreateComponentDto {
  @IsString()
  id: string;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;
}

class Position {
  @IsNumber()
  x: number;

  @IsNumber()
  y: number;
}

class DiagramNodeData {
  @IsString()
  label: string;

  @IsOptional()
  @Type(() => ComponentForBoard)
  component?: ComponentForBoard;

  @IsOptional()
  @IsObject()
  style?: Record<string, any>;
}

export class DiagramNode {
  @IsString()
  id: string;

  @IsEnum(DiagramNodeType)
  type: DiagramNodeType;

  @IsObject()
  @Type(() => Position)
  position: Position;

  @IsObject()
  @Type(() => DiagramNodeData)
  data: DiagramNodeData;
}

class DiagramEdgeData {
  @IsOptional()
  @IsEnum(RelationshipType)
  relationshipType?: RelationshipType;

  @IsOptional()
  @IsString()
  endpointId?: string;

  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  sourceComponent?: string;

  @IsOptional()
  @IsString()
  targetComponent?: string;
}

export class DiagramEdge {
  @IsString()
  id: string;

  @IsString()
  source: string;

  @IsString()
  target: string;

  @IsOptional()
  @IsString()
  sourceHandle?: string;

  @IsOptional()
  @IsString()
  targetHandle?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @Type(() => DiagramEdgeData)
  data?: DiagramEdgeData;
}

export class CreateBoardDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DiagramNode)
  nodes: DiagramNode[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DiagramEdge)
  edges: DiagramEdge[];

  @IsBoolean()
  isPublic: boolean;

  @IsString()
  createdBy: string;
}
