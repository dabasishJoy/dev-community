import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentsDto {
  @IsNotEmpty({ message: 'Title is empty' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'Description is empty' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Author id is empty' })
  @IsString()
  author: string;

  @IsNotEmpty({ message: 'Post id is empty' })
  @IsString()
  post: string;
}
