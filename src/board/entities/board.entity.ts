import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Component } from '../../component/entities/component.entity';

class DiagramNodePosition {
  @Prop({ type: Number, required: true })
  x: number;

  @Prop({ type: Number, required: true })
  y: number;
}

class DiagramNodeData {
  @Prop({ type: String, required: true })
  label: string;

  @Prop({ type: String, required: false })
  component?: Component;

  @Prop({ type: Object, required: false })
  style?: Record<string, any>;
}

export class DiagramNode {
  @Prop({ type: String, required: true })
  declare id: string;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: DiagramNodePosition, required: true })
  position: DiagramNodePosition;

  @Prop({ type: DiagramNodeData, required: true })
  data: DiagramNodeData;

  @Prop({ type: Number, required: false })
  width: number;

  @Prop({ type: Number, required: false })
  height: number;
}

class DiagramEdgeData {
  @Prop({ type: String, required: false })
  relationshipType?: string;

  @Prop({ type: String, required: false })
  endpointId?: string;

  @Prop({ type: String, required: false })
  label?: string;

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({ type: String, required: false })
  sourceComponent?: string;

  @Prop({ type: String, required: false })
  targetComponent?: string;
}

export class DiagramEdge  {
  @Prop({ type: String, required: true })
  source: string;

  @Prop({ type: String, required: true })
  target: string;

  @Prop({ type: String, required: false })
  sourceHandle?: string;

  @Prop({ type: String, required: false })
  targetHandle?: string;

  @Prop({ type: String, required: false })
  type?: string;

  @Prop({ type: DiagramEdgeData, required: false })
  data?: DiagramEdgeData;
}

@Schema()
export class Board extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({ type: [DiagramNode], required: true })
  nodes: DiagramNode[];

  @Prop({ type: [DiagramEdge], required: true })
  edges: DiagramEdge[];

  @Prop({ type: Boolean, required: true })
  isPublic: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: string;

  @Prop({ type: String, required: true })
  createdBy: string;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
BoardSchema.plugin(mongoosePaginate);
