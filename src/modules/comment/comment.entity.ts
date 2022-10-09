import { Comment } from '../../types/Comment.type';
import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import { User } from '../../types/user.type';

const {prop} = typegoose;

export interface UserEntity extends defaultClasses.Base {}

export class CommentEntity extends defaultClasses.TimeStamps implements Comment {

  constructor(data: Comment) {
    super();

    this.text = data.text;
    this.rating = data.rating;
    this.date = data.date;
    this.userId = data.userId;
  }

  @prop({required: true})
  public userId!: User;

  @prop({required: true, minlength : 5, maxlength : 50})
  public text!: string;

  @prop()
  public date!: Date;

  @prop({required: true})
  public rating!: number;

}

export const CommentModel = getModelForClass(CommentEntity);
