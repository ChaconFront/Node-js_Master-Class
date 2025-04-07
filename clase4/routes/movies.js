import { Router } from 'express';
import { readJSON } from './utils.js';
import { randomUUID } from 'node:crypto';

import { validateMovie, validatePartialMovie } from './shcemaas/esquema.js';

const movies = readJSON('./movies.json');

const Moviesrouter = Router();

Moviesrouter.get('/', (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const moviesFiltered = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );

    return res.json(moviesFiltered);
  }
  return res.json(movies);
});

Moviesrouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: 'Pelicula no encontrada' });
  }
});

Moviesrouter.post('/', (req, res) => {
  const result = validateMovie(req.body);
  if (!result.success) {
    // 422 Unprocessable Entity
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }
  // en base de datos
  const newMovie = {
    id: randomUUID(), // uuid v4
    ...result.data,
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});



Moviesrouter.patch('/:id', (req, res) => {
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


Moviesrouter.delete('/:id', (req, res) => {
  const {id}=req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  movies.splice(movieIndex, 1);
  return res.status(204).json({ message: 'Movie deleted' }); 
})


export default Moviesrouter;