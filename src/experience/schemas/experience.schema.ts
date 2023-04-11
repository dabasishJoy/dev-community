import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Developer } from 'src/developer/schemas/developer.schema';

export type ExperienceDocument = Experience & Document;

@Schema({ timestamps: true })
export class Experience {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  years: number;

  @Prop({ required: true })
  field: string;

  @Prop({ required: true, type: Types.ObjectId, ref: Developer.name })
  author: Types.ObjectId;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
