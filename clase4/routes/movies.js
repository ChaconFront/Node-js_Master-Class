import { Router } from 'express';
import { validateMovie, validatePartialMovie } from '../shcemaas/esquema.js';
import { MovieModel } from '../models/movie.js';
import { MovieController } from '../controllers/movies.controllers.js';

const moviesRouter = Router();

moviesRouter.get('/', MovieController.getAll);

moviesRouter.get('/:id', async (req, res) => {
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
});

moviesRouter.post('/', async (req, res) => {
  try {
    const result = validateMovie(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const newMovie = await MovieModel.create({ input: result.data });

    res.status(201).json(newMovie);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// PATCH /movies/:id
// Actualiza parcialmente una película existente
moviesRouter.patch('/:id', async (req, res) => {
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
});

moviesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await MovieModel.delete({ id });
  if (!result) {
    return res.status(404).json({ error: 'Movie not found' });
  }
  return res.status(204).json({ message: 'Movie deleted' });
});

export default moviesRouter;
