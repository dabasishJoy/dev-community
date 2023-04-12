import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentsDto {
  @IsNotEmpty({ message: 'Description is empty' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Author id is empty' })
  @IsString()
  authorId: string;

  @IsNotEmpty({ message: 'Post id is empty' })
  @IsString()
  postId: string;
}
