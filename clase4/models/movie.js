import { readJSON } from '../utils';

const movies = readJSON('../movies.json');

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
    }
    return movies;
  }

  static async getById({ id }) {
    const movie = movies.find((movie) => movie.id === id);
    if (movie) return movie;
  }

  static async create({ input }) {
    const newMovie = {
      id: randomUUID(), // uuid v4
      ...input,
    };
    movies.push(newMovie);
    return newMovie;
  }
}
