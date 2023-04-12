import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Developer } from 'src/developer/schemas/developer.schema';
import { Posts } from 'src/posts/schemas/posts.schema';

export type CommentsDocument = Comments & Document;

@Schema({ timestamps: true })
export class Comments {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: String, ref: Developer.name })
  authorId: string;

  @Prop({ required: true, type: String, ref: Posts.name })
  postId: string;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
