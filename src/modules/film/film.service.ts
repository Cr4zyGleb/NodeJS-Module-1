import {inject, injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import { FilmServiceInterface } from './film-service.interface.js';
import { FilmEntity } from './film.entity.js';
import CreateFilmDto from './dto/create-film.dto.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import {DEFAULT_FILM_COUNT} from './film.constant.js';
import { Types } from 'mongoose';
import { GenreType } from '../../types/genre-type.enum.js';

@injectable()
export default class FilmService implements FilmServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private  readonly logger: LoggerInterface,
    @inject(Component.FilmModel) private readonly filmModel: types.ModelType<FilmEntity>
  ) {}

  public async create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>> {
    const result = await this.filmModel.create(dto);
    this.logger.info(`New film created: ${dto.title}`);

    return result;
  }

  public async updateById(filmId: string, dto: UpdateFilmDto): Promise<DocumentType<FilmEntity> | null> {
    this.logger.info(`updateById ${filmId}`);
    return this.filmModel
      .findByIdAndUpdate(filmId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async deleteById(filmId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndDelete(filmId)
      .exec();
  }

  public async index(limit?: number): Promise<DocumentType<FilmEntity>[]> {
    const parsedLimit = limit && limit > 0 ? limit : DEFAULT_FILM_COUNT;
    return this.filmModel
      .aggregate([
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'filmId',
            as: 'comments'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
          }
        },
        { $unwind: {
          path :'$user',
          preserveNullAndEmptyArrays: true}
        },
        {
          $addFields: {
            commentCount: { $size: '$comments'}, rating: { $avg: '$comments.rating'}
          }
        },
        { $unset: 'comments' },
        { $limit: parsedLimit },
        { $sort: { releaseDate: -1 } },
      ]).exec();
  }

  public async findByGenre(genre: keyof typeof GenreType, limit?: number): Promise<DocumentType<FilmEntity>[]> {
    const result = await this.index(limit);

    return result.filter((elem) => elem.genre === genre);
  }

  public async findById(filmId: string): Promise<DocumentType<FilmEntity>> {
    return (await this.filmModel
      .aggregate([
        {$match:{ _id: new Types.ObjectId(filmId)}},
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'filmId',
            as: 'comments'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
          }
        },
        { $unwind: {
          path :'$user',
          preserveNullAndEmptyArrays: true}
        },
        {
          $addFields: {
            commentCount: { $size: '$comments'}, rating: { $avg: '$comments.rating'}
          }
        },
        { $unset: 'comments' },
        { $sort: { releaseDate: -1 } },
      ]).exec())[0];
  }

  public async getPromo(): Promise<DocumentType<FilmEntity> | null> {
    const result = await this.index();

    return result[0];
  }

  public async findFavorites(): Promise<DocumentType<FilmEntity>[]> {
    return this.filmModel
      .aggregate([
        {$match: {isFavorite: true}},
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'filmId',
            as: 'comments'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
          }
        },
        { $unwind: {
          path :'$user',
          preserveNullAndEmptyArrays: true}
        },
        {
          $addFields: {
            commentCount: { $size: '$comments'}, rating: { $avg: '$comments.rating'}
          }
        },
        { $unset: 'comments' },
        { $sort: { releaseDate: -1 } },
      ]).exec();
  }

  public async findAndChangeFavoriteStatus(filmId: string, status: 0 | 1): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel.findByIdAndUpdate(filmId, {isFavorite: status}, {new: true}).exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<FilmEntity> | null> {
    return this.filmModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentCount: 1,
      }}).exec();
  }

  public async exists(filmId: string): Promise<boolean> {
    console.log(filmId);
    return (await this.filmModel
      .exists({_id: filmId})) !== null;
  }

}
