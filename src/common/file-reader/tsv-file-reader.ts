import { readFileSync } from 'fs';
import { Film } from '../../types/film.type.js';
import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Film[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([id, name, posterImage, previewImage, backgroundImage, backgroundColor, videoLink, previewVideoLink, description,
        rating, scoresCount, director, starring, runTime, genre, released, isFavorite]) => ({
        id: Number.parseInt(id, 10),
        name,
        posterImage,
        previewImage,
        backgroundImage,
        backgroundColor,
        videoLink,
        previewVideoLink,
        description,
        rating: Number.parseInt(rating, 10),
        scoresCount: Number.parseInt(scoresCount, 10),
        director,
        starring: starring.split(';')
          .map((actor) => ({actor})),
        runTime: Number.parseInt(runTime, 10),
        genre,
        released: Number.parseInt(released, 10),
        isFavorite : isFavorite === 'true'
      }));
  }
}
