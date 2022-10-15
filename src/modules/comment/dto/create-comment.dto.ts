import { User } from '../../../types/user.type.js';

export default class CreateCommentDto {
  public text!: string ;
  public rating!: number;
  public date!: Date;
  public userId!: User;
  public filmId!: number;
}
