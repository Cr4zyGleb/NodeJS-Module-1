import {Matches, IsOptional, MaxLength, MinLength} from 'class-validator';

export default class UpdateUserDto {

  @IsOptional()
  @Matches(/\S+(?:jpg|png)$/)
  public avatar!: string;

  @IsOptional()
  @MinLength(1, {message: 'Minimum name length must be 1'})
  @MaxLength(15, {message: 'Maximum name length must be 15'})
  public userName!: string;

  @IsOptional()
  @MinLength(6, {message: 'Minimum password length must be 6'})
  @MaxLength(12, {message: 'Maximum password length must be 12'})
  public password!: string;
}
