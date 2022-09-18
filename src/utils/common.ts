import { Film } from '../types/film.type';

export const createFilm = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [name, description, releasedDate, publicationDate, genre, rating, previewVideoLink, videoLink, director, starrings,
    runTime, scoresCounts, userName, email, avatar, password, posterImage, backgroundImage, backgroundColor] = tokens;
  return {
    name,
    description,
    releasedDate: Number.parseInt(releasedDate, 10),
    publicationDate: new Date(publicationDate),
    genre,
    rating: Number.parseInt(rating, 10),
    previewVideoLink,
    videoLink,
    director,
    starrings : starrings.split(';').map((elem) => elem),
    runTime: Number.parseInt(runTime, 10),
    scoresCounts: Number.parseInt(scoresCounts, 10),
    user: { userName, email, avatar, password },
    posterImage,
    backgroundImage,
    backgroundColor,
  } as Film;
};


export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';
