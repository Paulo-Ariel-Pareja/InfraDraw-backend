import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema()
export class Endpoint extends Document {
  @Prop({ type: String, required: true })
  method: string;

  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: String, required: false })
  description?: string;
}

@Schema()
export class Component extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  technology: string;

  @Prop({ type: [Endpoint], required: true })
  endpoints: Endpoint[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: string;
}

export const ComponentSchema = SchemaFactory.createForClass(Component);
ComponentSchema.plugin(mongoosePaginate);
