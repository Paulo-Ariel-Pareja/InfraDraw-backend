import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema()
export class SequenceDiagram {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({ type: String, required: true })
  mermaidCode: string;

  @Prop({ type: Boolean, required: true })
  isPublic: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: string;

  @Prop({ type: String, required: true })
  createdBy: string;
}
export const SequenceDiagramSchema =
  SchemaFactory.createForClass(SequenceDiagram);
SequenceDiagramSchema.plugin(mongoosePaginate);
