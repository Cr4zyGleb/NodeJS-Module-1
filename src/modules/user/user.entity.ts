import { User } from '../../types/user.type.js';
import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import { createSHA256 } from '../../utils/common.js';

const {prop} = typegoose;

export interface UserEntity extends defaultClasses.Base {}

export class UserEntity extends defaultClasses.TimeStamps implements User {

  constructor(data: User) {
    super();

    this.email = data.email;
    this.avatar = data.avatar;
    this.userName = data.userName;
    this.password = data.password;
  }

  @prop({required: true})
  public userName!: string;

  @prop({
    required: true,
    unique: true})
  // match : /^.*\.(jpg|JPG|png|PNG)$/})
  public avatar!: string;

  @prop({default: '', })
  public email!: string;

  @prop({required: true})
  public password!: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
