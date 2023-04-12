import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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

  @Prop({ required: true, type: String, ref: Developer.name })
  authorId: string;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
