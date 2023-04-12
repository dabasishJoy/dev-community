import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export enum GranType {
  email = 'email',
  refresh = 'refresh',
}
export class AuthCredentialsDto {
  @IsNotEmpty({ message: 'Gran type name is empty' })
  @IsEnum(GranType, { message: 'Invalid grantype type' })
  readonly granType: GranType;

  @IsNotEmpty({ message: 'Email is empty' })
  @ValidateIf((obj) => obj.granType === GranType.email)
  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty({ message: 'Email is empty' })
  @ValidateIf((obj) => obj.granType === GranType.email)
  @IsString()
  readonly password: string;

  @IsNotEmpty({ message: 'Refresh token is empty' })
  @ValidateIf((obj) => obj.granType === GranType.refresh)
  @IsOptional()
  @IsString()
  readonly refreshToken: string;
}
