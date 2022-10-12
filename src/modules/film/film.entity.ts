import {defaultClasses, Ref} from '@typegoose/typegoose';
import typegoose, {getModelForClass} from '@typegoose/typegoose';
import dayjs from 'dayjs';
import { GenreType } from '../../types/genre-type.enum.js';
import { UserEntity } from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface FilmEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'films'
  }
})
export class FilmEntity extends defaultClasses.TimeStamps {

  @prop({
    required:true,
    default: '',
    minLength: [2, 'Title min length is 2!'],
    maxLength: [100, 'Title max length is 100!'],
  })
  public title!: string;

  @prop({
    required:true,
    default: '',
    minLength: [20, 'Description min length is 20!'],
    maxLength: [1024, 'Description max length is 1042!'],
  })
  public description!: string;

  @prop({required: true, default : dayjs(new (Date), 'YYYY-MM-DD')})
  public releasedDate!: Date;

  @prop({required: true})
  public publicationDate!: Date;

  @prop({
    required: true,
    type: () => String,
    enum: GenreType})
  public genre!: GenreType;

  @prop({required: true, min : 0, max : 10, default: 0})
  public rating!: number;

  @prop({required: true})
  public previewVideoLink!: string;

  @prop({required: true})
  public videoLink!: string;

  @prop({required: true, minlength : 2, maxlength : 50})
  public director!: string;

  @prop({required: true})
  public starrings!: string[];

  @prop({required: true})
  public runTime!: number;

  @prop({})
  public scoresCounts!: number;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({
    required: true,
    match : /^.*\.(jpg|JPG)$/})
  public posterImage!: string;

  @prop({
    required: true,
    match : /^.*\.(jpg|JPG)$/})
  public backgroundImage!: string;

  @prop({required: true})
  public backgroundColor!: string;

}

export const FilmModel = getModelForClass(FilmEntity);
