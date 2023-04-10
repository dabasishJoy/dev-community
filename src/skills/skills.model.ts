import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Developer } from 'src/developer/developer.model';

export type SkillsDocument = Skills & Document;

@Schema({ timestamps: true })
export class Skills {
  @Prop({ required: true })
  skillname: [string];

  @Prop({ required: true, type: Types.ObjectId, ref: Developer.name })
  author: Developer;
}

export const SkillsSchema = SchemaFactory.createForClass(Skills);
