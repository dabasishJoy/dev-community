import { Types } from 'mongoose';

export interface IJwtPayload {
  email: string;
  userId: Types.ObjectId;
}
