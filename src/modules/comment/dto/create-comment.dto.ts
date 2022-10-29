import {IsDateString, IsInt, IsMongoId, MaxLength, MinLength} from 'class-validator';

export default class CreateCommentDto {
  @MinLength(5, {message: 'Minimum director length must be 5'})
  @MaxLength(1024, {message: 'Maximum director length must be 1024'})
  public text!: string ;

  @IsInt({message: 'Rating must be an integer'})
  public rating!: number;

  @IsDateString({}, {message: 'date must be valid ISO date'})
  public date!: string;

  @IsMongoId({message: 'userId field must be valid an id'})
  public userId!: string;

  @IsMongoId({message: 'FilmId field must be valid an id'})
  public filmId!: string;
}
