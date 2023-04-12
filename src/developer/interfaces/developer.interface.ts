import { Types } from 'mongoose';

export interface IDeveloper {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  password: string;
  _id: Types.ObjectId;
}
