import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExperienceDto {
  @IsNotEmpty({ message: 'Description is empty' })
  @IsString()
  readonly description: string;

  @IsNotEmpty({ message: 'Years is empty' })
  @IsNumber()
  readonly years: number;

  @IsNotEmpty({ message: 'Field is empty' })
  @IsString()
  field: string;
  readonly author: string;
}
