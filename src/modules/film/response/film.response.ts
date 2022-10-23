import {Expose, Type} from 'class-transformer';
import { GenreType } from '../../../types/genre-type.enum.js';
import UserResponse from '../../user/response/user.response.js';

export default class FilmResponse {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public releaseDate!: number;

  @Expose()
  public publicationDate!: number;

  @Expose()
  public genre!: GenreType;

  @Expose()
  public rating!: number;

  @Expose()
  public previewVideoLink!: string;

  @Expose()
  public videoLink!: string;

  @Expose()
  public director!: string;

  @Expose()
  public starrings!: string[];

  @Expose()
  public runTime!: number;

  @Expose()
  public scoresCounts!: number;

  @Expose()
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public posterImage!: string;

  @Expose()
  public backgroundImage!: string;

  @Expose()
  public backgroundColor!: string;

}
