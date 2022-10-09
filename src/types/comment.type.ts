import { User } from './user.type';

export type Comment = {
  text: string ;
  rating: number;
  date: Date;
  userId: User;
}
