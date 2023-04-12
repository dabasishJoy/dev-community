import { Types } from 'mongoose';

export interface IPost {
  title: string;
  description: string;
  authorId: string;
  _id: Types.ObjectId;
}
