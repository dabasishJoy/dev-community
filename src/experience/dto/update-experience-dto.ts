import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateExperienceDto {
  @IsNotEmpty({ message: 'Description is empty' })
  @IsString()
  readonly description: string;

  @IsNotEmpty({ message: 'Years is empty' })
  @IsNumber()
  readonly years: number;

  @IsNotEmpty({ message: 'Author id is empty' })
  @IsString()
  field: string;
  readonly author: string;
}
