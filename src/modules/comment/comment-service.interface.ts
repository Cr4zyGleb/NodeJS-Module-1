import {DocumentType} from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity';
import CreateCommentDto from './dto/create-comment.dto';

export interface UserServiceInterface {
  create(dto: CreateCommentDto, salt: string): Promise<DocumentType<CommentEntity>>;
}
