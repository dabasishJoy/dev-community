import { IsString } from 'class-validator';

export class CreateExperienceDto {
  @IsString()
  description: string;
  @IsString()
  years: number;
  @IsString()
  field: string;
  author: string;
}
