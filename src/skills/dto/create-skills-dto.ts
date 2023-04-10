import { IsString } from 'class-validator';

export class CreateSkillsDto {
  @IsString()
  skillname: [string];
  author: string;
}
