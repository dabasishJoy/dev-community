import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Developer } from 'src/developer/developer.model';
import { Posts } from 'src/posts/posts.model';

export type CommentsDocument = Posts & Document;

@Schema({ timestamps: true })
export class Comments {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: Types.ObjectId, ref: Developer.name })
  author: Developer;

  @Prop({ required: true, type: Types.ObjectId, ref: Posts.name })
  post: Posts;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
