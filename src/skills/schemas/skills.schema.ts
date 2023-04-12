import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Developer } from 'src/developer/schemas/developer.schema';

export type SkillsDocument = Skills & Document;

@Schema({ timestamps: true })
export class Skills {
  @Prop({ required: true })
  skillname: [string];

  @Prop({ required: true, type: Types.ObjectId, ref: Developer.name })
  author: Types.ObjectId;
}

export const SkillsSchema = SchemaFactory.createForClass(Skills);
