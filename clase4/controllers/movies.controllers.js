import { MovieModel } from '../models/movie.js';
import { validateMovie, validatePartialMovie } from '../shcemaas/esquema.js';

export class MovieController {
  static async getAll(req, res) {
    try {
      const { genre } = req.query;
      const movies = await MovieModel.getAll({ genre });
      res.json(movies);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const movie = await MovieModel.getById({ id });
      if (movie) {
        res.json(movie);
      } else {
        res.status(404).json({ error: 'Pelicula no encontrada' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  static async post(req, res) {
    try {
      const result = validateMovie(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const newMovie = await MovieModel.create({ input: result.data });

      res.status(201).json(newMovie);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  static async patch(req, res) {
    const result = validatePartialMovie(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const { id } = req.params;
    const updateMovie = await MovieModel.update({
      id,
      input: result.data,
    });

    return res.json(updateMovie);
  }

  static  async delete(req, res) {
    const { id } = req.params;
    const result = await MovieModel.delete({ id });
    if (!result) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    return res.status(204).json({ message: 'Movie deleted' });
  }


}
