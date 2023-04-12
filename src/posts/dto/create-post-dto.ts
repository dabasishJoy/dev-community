import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'Title is empty' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'Description is empty' })
  @IsString()
  description: string;
  author: string;
}
