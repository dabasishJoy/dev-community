import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Developer } from 'src/developer/schemas/developer.schema';

export type PostsDocument = Posts & Document;

@Schema({ timestamps: true })
export class Posts {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: Types.ObjectId, ref: Developer.name })
  author: Types.ObjectId;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
