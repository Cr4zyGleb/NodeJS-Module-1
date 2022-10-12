import { GenreType } from '../../../types/genre-type.enum';

export default class UpdateFilmDto {
  public title!: string;
  public description!: string;
  public releasedDate!: Date;
  public publicationDate!: Date;
  public genre!: GenreType;
  public rating!: number;
  public previewVideoLink!: string;
  public videoLink!: string;
  public director!: string;
  public starrings!: string[];
  public runTime!: number;
  public scoresCounts!: number;
  public posterImage!: string;
  public backgroundImage!: string;
  public backgroundColor!: string;
  public filmId!: string;
}
