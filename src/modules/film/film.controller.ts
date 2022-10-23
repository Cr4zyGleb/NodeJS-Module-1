import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import { FilmServiceInterface } from './film-service.interface.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO} from '../../utils/common.js';
import FilmResponse from './response/film.response.js';
import CreateFilmDto from './dto/create-film.dto.js';
import HttpError from '../../common/errors/http-error.js';

@injectable()
export default class FilmController extends Controller {
  constructor(@inject(Component.LoggerInterface) logger: LoggerInterface,
  @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CategoryController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const films = await this.filmService.find();
    const filmResponse = fillDTO(FilmResponse, films);
    this.send(res, StatusCodes.OK, filmResponse);
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateFilmDto>,
    res: Response
  ):Promise<void> {
    const result = await this.filmService.create(body);
    const newFilm = await this.filmService.findById(result.id);
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(FilmResponse, newFilm)
    );
  }

  public async getFavorite(
    _req: Request,
    res: Response
  ):Promise<void> {
    const favoriteFilms = await this.filmService.findFavorites();

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
    {params}: Request,
    res: Response
  ):Promise<void> {
    const result = await this.filmService.findAndChangeFavoriteStatus(params.filmId, parseInt(params.status, 10) as 0 | 1);
    console.log(result);
    if (!result) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Film with ID ${params.filmId} not exist`,
        'FilmFavoriteController'
      );
    }

    this.ok(res, fillDTO(FilmResponse, result));
  }
}
