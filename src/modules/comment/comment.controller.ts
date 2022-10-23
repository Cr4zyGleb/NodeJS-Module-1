import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Controller} from '../../common/controller/controller.js';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO} from '../../utils/common.js';
import CommentResponse from './response/comment.response.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import HttpError from '../../common/errors/http-error.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { FilmServiceInterface } from '../film/film-service.interface.js';

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(Component.FilmServiceInterface) private readonly filmService: FilmServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CpmmentController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.getCommentsByFilmId});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public async getCommentsByFilmId(req: Request, res: Response): Promise<void> {
    const filmId = req.params.filmId;
    const result = await this.commentService.findByFilmId(filmId);

    this.logger.info('new comment get success');

    this.ok(
      res,
      fillDTO(CommentResponse, result)
    );
  }


  public async create(
    req: Request<object, object, CreateCommentDto>,
    res: Response
  ): Promise<void> {
    const {body} = req;
    if (!await this.filmService.exists(body.filmId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Film with id ${body.filmId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create(body.filmId, body);
    await this.filmService.incCommentCount(body.filmId);

    this.logger.info('new comment created');
    this.created(res, fillDTO(CommentResponse, comment));
  }
}

