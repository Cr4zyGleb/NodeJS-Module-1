import {Matches, IsArray, IsDateString, IsOptional, IsMongoId, IsString, IsEnum, IsInt, MaxLength, MinLength} from 'class-validator';
import { GenreType } from '../../../types/genre-type.enum.js';

export default class UpdateFilmDto {
  @IsOptional()
  @MinLength(2, {message: 'Minimum name length must be 2'})
  @MaxLength(100, {message: 'Maximum name length must be 100'})
  public title!: string;

  @IsOptional()
  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
  public description!: string;

  @IsOptional()
  @IsDateString({}, {message: 'date must be valid ISO date'})
  public releasedDate!: Date;

  @IsOptional()
  @IsDateString({}, {message: 'date must be valid ISO date'})
  public publicationDate!: Date;

  @IsOptional()
  @IsEnum(GenreType, {message: 'type must be genre enum'})
  public genre!: GenreType;

  @IsOptional()
  @IsInt({message: 'Rating must be an integer'})
  public rating!: number;

  @IsOptional()
  @IsString({message: 'PreviewVideoLink is required'})
  public previewVideoLink!: string;

  @IsOptional()
  @IsString({message: 'VideoLink is required'})
  public videoLink!: string;

  @IsOptional()
  @MinLength(2, {message: 'Minimum director length must be 2'})
  @MaxLength(50, {message: 'Maximum director length must be 50'})
  public director!: string;

  @IsOptional()
  @IsArray({message: 'Field starrings must be an array'})
  public starrings!: string[];

  @IsOptional()
  @IsInt({message: 'RunTime must be an integer'})
  public runTime!: number;

  @IsOptional()
  @IsInt({message: 'CommentCount must be an integer'})
  public scoresCounts!: number;

  @IsOptional()
  @IsString({message: 'PosterImage is required'})
  @Matches(/\S+.jpg$/)
  public posterImage!: string;

  @IsOptional()
  @IsString({message: 'BackgroundImage is required'})
  @Matches(/\S+.jpg$/)
  public backgroundImage!: string;

  @IsOptional()
  @IsString({message: 'BackgroundColor is required'})
  public backgroundColor!: string;

  @IsMongoId({message: 'FilmId field must be valid an id'})
  public filmId!: string;
}
