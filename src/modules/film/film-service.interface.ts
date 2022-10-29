
import {DocumentType} from '@typegoose/typegoose';
import { DocumentExistsInterface } from '../../types/document-exists.interface.js';
import CreateFilmDto from './dto/create-film.dto.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import { FilmEntity } from './film.entity.js';

export interface FilmServiceInterface extends DocumentExistsInterface{
  create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>>;
  updateById(filmId: string, dto: UpdateFilmDto): Promise<DocumentType<FilmEntity> | null>;
  deleteById(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  index(): Promise<DocumentType<FilmEntity>[]>;
  findByGenre(genre: string, count?: number): Promise<DocumentType<FilmEntity>[] | null>;
  findById(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  getPromo() : Promise<DocumentType<FilmEntity> | null>;
  findFavorites(userId: string, count?: number): Promise<DocumentType<FilmEntity>[] | null>;
  findAndChangeFavoriteStatus(filmId: string, status: number) : Promise<DocumentType<FilmEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<FilmEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
