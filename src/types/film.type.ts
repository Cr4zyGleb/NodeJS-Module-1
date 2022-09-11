import { Starring } from './starring.type';

export type Film = {
  id: number;
  name: string;
  posterImage: string;
  previewImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  previewVideoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: Starring[];
  runTime: number;
  genre: string;
  released: number;
  isFavorite: boolean;
}
