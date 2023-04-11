import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeveloperDocument = Developer & Document;

// Schema Definition
@Schema({ timestamps: true })
export class Developer {
  @Prop({ required: true })
  fname: string;

  @Prop({ required: true })
  lname: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  userId: string;
}

export const DeveloperSchema = SchemaFactory.createForClass(Developer);
