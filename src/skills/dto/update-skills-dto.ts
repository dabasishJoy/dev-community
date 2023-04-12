import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateSkillsDto {
  @IsNotEmpty({ message: 'Skill names are empty' })
  @IsArray()
  skillname: [string];

  // @IsNotEmpty({ message: 'Author name is empty' })
  // @IsString()
  // author: string;

  // @IsNotEmpty({ message: 'Skill id is empty' })
  // @IsString()
  // skill: string;
}
