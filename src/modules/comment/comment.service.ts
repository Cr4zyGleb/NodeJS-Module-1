import {DocumentType, types} from '@typegoose/typegoose';
import {CommentEntity} from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto';
import {UserServiceInterface} from './comment-service.interface';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';


@injectable()
export default class UserService implements UserServiceInterface {

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.CommentModel) private readonly CommentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const result = await this.CommentModel.create(dto);
    this.logger.info('New comment created');

    return result;
  }
}
