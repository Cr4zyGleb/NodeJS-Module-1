import { GenreType } from './genre-type.enum.js';
import { User } from './user.type.js';

export type Film = {
  title: string;
  description: string;
  releasedDate : Date;
  publicationDate: Date;
  genre: GenreType;
  rating: number;
  previewVideoLink: string;
  videoLink: string;
  director: string;
  starrings: string[];
  runTime: number;
  scoresCounts: number;
  user: User;
  posterImage: string;
  backgroundImage: string;
  backgroundColor: string;
}
