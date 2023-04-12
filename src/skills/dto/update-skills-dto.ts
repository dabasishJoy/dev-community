import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSkillsDto {
  @IsNotEmpty({ message: 'Skill names are empty' })
  @IsString()
  skillname: [string];

  @IsNotEmpty({ message: 'Author name is empty' })
  @IsString()
  author: string;

  @IsString()
  @IsNotEmpty({ message: 'Skill id is empty' })
  skill: string;
}
