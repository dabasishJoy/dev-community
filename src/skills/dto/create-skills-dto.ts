import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateSkillsDto {
  @IsNotEmpty({ message: 'Skill names are empty' })
  @IsArray()
  @IsString()
  skillname: [string];

  @IsString()
  @IsNotEmpty({ message: 'author id is empty' })
  author: string;
}
