import {DocumentType, types} from '@typegoose/typegoose';
import {CommentEntity} from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import {CommentServiceInterface} from './comment-service.interface.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';

const DEFAULT_COMMENT_COUNT = 50;

@injectable()
export default class CommentService implements CommentServiceInterface {

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(filmId: string, dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const commentWithId = {
      ...dto,
      filmId
    };
    const result = await this.commentModel.create(commentWithId);
    this.logger.info('New comment created!');

    return result;
  }

  public async find(filmId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({filmId: filmId})
      .limit(DEFAULT_COMMENT_COUNT)
      .sort({date: -1})
      .exec();
  }

}
