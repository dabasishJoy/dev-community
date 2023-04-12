import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Developer } from 'src/developer/schemas/developer.schema';

export type SkillsDocument = Skills & Document;

@Schema({ timestamps: true })
export class Skills {
  @Prop({ required: true })
  skillname: [string];

  @Prop({ required: true, type: String, ref: Developer.name })
  authorId: string;
}

export const SkillsSchema = SchemaFactory.createForClass(Skills);
