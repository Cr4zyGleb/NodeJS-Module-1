import { MockData } from '../../types/mock-data.type.js';
import { User } from '../../types/user.type.js';
import { getRandomItem, getRandomItems } from '../../utils/random.js';
import { FilmGeneratorInterface } from './film-generator.interface.js';

export default class FilmGenerator implements FilmGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.names);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const releasedDate = getRandomItem<string>(this.mockData.releasedDates);
    const publicationDate = getRandomItem<string>(this.mockData.publicationDates);
    const genre = getRandomItem<string>(this.mockData.genres);
    const rating = getRandomItem<string>(this.mockData.ratings);
    const previewVideoLink = getRandomItem<string>(this.mockData.previewVideoLinks);
    const videoLink = getRandomItem<string>(this.mockData.videoLinks);
    const director = getRandomItem<string>(this.mockData.directors);
    const starrings = getRandomItems<string>(this.mockData.starrings);
    const runTime = getRandomItem<string>(this.mockData.runTimes);
    const scoresCounts = getRandomItem<string>(this.mockData.scoresCounts);
    const {userName, email, avatar, password} = getRandomItem<User>(this.mockData.users);
    const posterImage = getRandomItem<string>(this.mockData.posterImages);
    const backgroundImage = getRandomItem<string>(this.mockData.backgroundImages);
    const backgroundColor = getRandomItem<string>(this.mockData.backgroundColors);

    return [
      name, description,
      releasedDate, publicationDate, genre, rating,
      previewVideoLink, videoLink, director, starrings,
      runTime, scoresCounts, userName, email, avatar, password, posterImage,
      backgroundImage, backgroundColor
    ].join('\t');
  }
}
