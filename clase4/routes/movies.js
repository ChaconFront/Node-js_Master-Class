import { Router } from 'express';


import { readJSON } from '../utils.js';
import { validateMovie, validatePartialMovie } from '../shcemaas/esquema.js';
import { MovieModel } from '../models/movie.js';

const movies = readJSON('../movies.json');

const moviesRouter = Router();

moviesRouter.get('/', async (req, res) => {
  const { genre } = req.query;
  const movies = await MovieModel.getAll({ genre });
  res.json(movies);
});

moviesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const movie = await MovieModel.getById({ id });
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: 'Pelicula no encontrada' });
  }
});

moviesRouter.post('/', (req, res) => {
  const result = validateMovie(req.body);
  if (!result.success) {
    // 422 Unprocessable Entity
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }
  // en base de datos

  res.status(201).json(newMovie);
});

// PATCH /movies/:id
// Actualiza parcialmente una película existente
moviesRouter.patch('/:id', (req, res) => {
  const result = validatePartialMovie(req.body);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  };

  movies[movieIndex] = updateMovie;

  return res.json(updateMovie);
});

moviesRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  movies.splice(movieIndex, 1);
  return res.status(204).json({ message: 'Movie deleted' });
});

export default moviesRouter;
