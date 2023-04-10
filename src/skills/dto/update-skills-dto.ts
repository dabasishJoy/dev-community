import { IsString } from 'class-validator';

export class UpdateSkillsDto {
  @IsString()
  skillname: [string];
  author: string;
  skill: string;
}
