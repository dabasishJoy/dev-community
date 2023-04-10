import { IsString } from 'class-validator';

export class CreateCommentsDto {
  @IsString()
  title: string;
  @IsString()
  description: string;

  author: string;

  post: string;
}
