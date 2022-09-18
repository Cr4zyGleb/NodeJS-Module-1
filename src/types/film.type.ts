import { userType } from './user.type';

export type Film = {
  name: string;
  description: string;
  releasedDate : number;
  publicationDate: Date;
  genre: string;
  rating: number;
  previewVideoLink: string;
  videoLink: string;
  director: string;
  starrings: string[];
  runTime: number;
  scoresCounts: number;
  user: userType;
  posterImage: string;
  backgroundImage: string;
  backgroundColor: string;
}
