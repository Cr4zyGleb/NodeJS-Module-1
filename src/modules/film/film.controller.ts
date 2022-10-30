import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { FilmServiceInterface } from './film-service.interface.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../utils/common.js';
import * as core from 'express-serve-static-core';
import FilmResponse from './response/film.response.js';
import CreateFilmDto from './dto/create-film.dto.js';
import HttpError from '../../common/errors/http-error.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';

const limitFilmsByGenre = 60;
const limitFavoriteFilms = 60;

@injectable()
export default class FilmController extends Controller {
  constructor(@inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: FilmServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CategoryController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateFilmDto)] });
    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Patch,
      handler: this.updateById,
      middlewares: [
        new ValidateObjectIdMiddleware('filmId'),
        new ValidateDtoMiddleware(UpdateFilmDto),
        new DocumentExistsMiddleware(this.filmService, 'film', 'filmId')
      ]
    });
    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Delete,
      handler: this.deteleById,
      middlewares: [
        new ValidateObjectIdMiddleware('filmId'),
        new DocumentExistsMiddleware(this.filmService, 'film', 'filmId')
      ]
    });
    this.addRoute({
      path: '/genre/:genre',
      method: HttpMethod.Get,
      handler: this.findByGenre
    });
    this.addRoute({
      path: '/promo',
      method: HttpMethod.Get,
      handler: this.getPromo
    });
    this.addRoute({
      path: '/favorite',
      method: HttpMethod.Get,
      handler: this.getFavorite
    });
    this.addRoute({
      path: '/favorite/:filmId/:status',
      method: HttpMethod.Post,
      handler: this.setFavorite,
      middlewares: [
        new DocumentExistsMiddleware(this.filmService, 'film', 'filmId')
      ]
    });
    this.addRoute({
      path: '/:filmId',
      method: HttpMethod.Get,
      handler: this.findById,
      middlewares: [new ValidateObjectIdMiddleware('filmId')]
    });
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateFilmDto>,
    res: Response
  ): Promise<void> {
    const result = await this.filmService.create(body);
    const newFilm = await this.filmService.findById(result.id);
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(FilmResponse, newFilm)
    );
  }

  public async updateById(
    { body, params }: Request<core.ParamsDictionary, Record<string, unknown>, UpdateFilmDto>,
    res: Response
  ): Promise<void> {
    this.logger.info(params.filmId);
    this.logger.info(body.title);
    const updatedFilm = await this.filmService.updateById(params.filmId, body);

    const result = await this.filmService.findById(updatedFilm?.id);
    this.ok(res, fillDTO(FilmResponse, result));
  }

  public async deteleById(
    { params }: Request<core.ParamsDictionary>,
    res: Response
  ): Promise<void> {
    const result = await this.filmService.deleteById(params.filmId);

    if (result) {
      await this.commentService.deleteById(params.filmId);
    }

    this.ok(res, fillDTO(FilmResponse, result));
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const films = await this.filmService.index();
    const filmResponse = fillDTO(FilmResponse, films);
    this.send(res, StatusCodes.OK, filmResponse);
  }

  public async findByGenre(
    { params }: Request<core.ParamsDictionary>,
    res: Response
  ): Promise<void> {
    this.logger.info(`genre ${params.genre}`);
    const result = await this.filmService.findByGenre(params.genre, limitFilmsByGenre);
    this.ok(res, fillDTO(FilmResponse, result));
  }

  public async findById(
    { params }: Request<core.ParamsDictionary>,
    res: Response
  ): Promise<void> {
    const result = await this.filmService.findById(params.filmId);
    this.ok(res, fillDTO(FilmResponse, result));
  }

  public async getPromo(_req: Request, res: Response): Promise<void> {
    this.logger.info('getPromo');
    const promoFilm = await this.filmService.getPromo();
    this.ok(res, fillDTO(FilmResponse, promoFilm));
  }

  public async getFavorite(
    { params }: Request<core.ParamsDictionary>,
    res: Response
  ): Promise<void> {
    const favoriteFilms = await this.filmService.findFavorites(params.userId, limitFavoriteFilms);

    if (!favoriteFilms || favoriteFilms.length === 0) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        'No Favorite films exist',
        'FilmFavoriteController'
      );
    }

    this.ok(res, fillDTO(FilmResponse, favoriteFilms));
  }

  public async setFavorite(
    { params }: Request,
    res: Response
  ): Promise<void> {
    const result = await this.filmService.findAndChangeFavoriteStatus(params.filmId, parseInt(params.status, 10) as 0 | 1);
    this.ok(res, fillDTO(FilmResponse, result));
  }
}
