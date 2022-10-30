import typegoose, {getModelForClass, defaultClasses, Ref} from '@typegoose/typegoose';
import { FilmEntity } from '../film/film.entity.js';
import { UserEntity } from '../user/user.entity.js';

const { prop, modelOptions } = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})

export class CommentEntity extends defaultClasses.TimeStamps {

  @prop({
    ref: FilmEntity,
    required: true})
  public filmId!: Ref<FilmEntity>;

  @prop({
    ref: UserEntity,
    required: false
  })
  public userId!: Ref<UserEntity>;

  @prop({required: true, minlength : 5, maxlength : 50})
  public text!: string;

  @prop()
  public date!: string;

  @prop({required: true})
  public rating!: number;

}

export const CommentModel = getModelForClass(CommentEntity);
