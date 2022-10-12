import {DocumentType} from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';

export interface CommentServiceInterface {
  create(filmId: string, dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  find(filmId: string): Promise<DocumentType<CommentEntity>[]>;
}
