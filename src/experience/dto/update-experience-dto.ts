import { IsString } from 'class-validator';

export class UpdateExperienceDto {
  @IsString()
  description: string;
  @IsString()
  years: number;
  @IsString()
  field: string;
  author: string;
}
