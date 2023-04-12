import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateSkillsDto {
  @IsNotEmpty({ message: 'Skill names are empty' })
  @IsArray()
  skillname: [string];
}
