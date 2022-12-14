import crypto from 'crypto';
import * as jose from 'jose';
import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces/class-constructor.type.js';
import { Film } from '../types/film.type';

export const createFilm = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    title,
    description,
    releasedDate,
    publicationDate,
    genre,
    rating,
    previewVideoLink,
    videoLink,
    director,
    starrings,
    runTime,
    scoresCounts,
    userName,
    email,
    avatar,
    password,
    posterImage,
    backgroundImage,
    backgroundColor,
  ] = tokens;
  return {
    title,
    description,
    releasedDate: new Date(releasedDate),
    publicationDate: new Date(publicationDate),
    genre,
    rating: Number.parseInt(rating, 10),
    previewVideoLink,
    videoLink,
    director,
    starrings: starrings.split(';').map((elem) => elem),
    runTime: Number.parseInt(runTime, 10),
    scoresCounts: Number.parseInt(scoresCounts, 10),
    user: { userName, email, avatar, password },
    posterImage,
    backgroundImage,
    backgroundColor
  } as Film;
};


export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';


export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });

export const createErrorObject = (message: string) => ({
  error: message,
});

export const createJWT = async (algoritm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({ alg: algoritm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));
