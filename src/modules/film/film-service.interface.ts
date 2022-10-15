
import {DocumentType} from '@typegoose/typegoose';
import { GenreType } from '../../types/genre-type.enum.js';
import CreateFilmDto from './dto/create-film.dto.js';
import UpdateFilmDto from './dto/update-film.dto.js';
import { FilmEntity } from './film.entity.js';

export interface FilmServiceInterface {
  create(dto: CreateFilmDto): Promise<DocumentType<FilmEntity>>;
  updateById(filmId: string, dto: UpdateFilmDto): Promise<DocumentType<FilmEntity> | null>;
  deleteById(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  find(): Promise<DocumentType<FilmEntity>[]>;
  findByGenre(genre: GenreType, count?: number): Promise<DocumentType<FilmEntity>[] | null>;
  findById(filmId: string): Promise<DocumentType<FilmEntity> | null>;
  findPromo() : Promise<DocumentType<FilmEntity> | null>;
  findFavorites(): Promise<DocumentType<FilmEntity>[]>;
  findAndChangeFavoriteStatus(filmId: string, status: number) : Promise<DocumentType<FilmEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<FilmEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
