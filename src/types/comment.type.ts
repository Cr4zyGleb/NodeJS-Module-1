import { Film } from './film.type.js';
import { User } from './user.type.js';

export type Comment = {
  text: string ;
  rating: number;
  date: Date;
  userId: User;
  filmId : Film
}
