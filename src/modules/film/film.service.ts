import {inject, injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import { FilmServiceInterface } from './film-service.interface.js';
import { FilmEntity } from './film.entity.js';
import CreateFilmDto from './dto/create-film.dto.js';

@injectable()
export default class FilmService implements FilmServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private  readonly logger: LoggerInterface,
    @inject(Component.FilmModel) private readonly filmModel: types.ModelType<FilmEntity>
  ) {}

  public async create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>> {
    const result = await this.filmModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findById(offerId)
      .populate(['userId', 'categories'])
      .exec();
  }

  public async find(): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel
      .find()
      .populate(['userId', 'categories'])
      .exec();
  }

}
