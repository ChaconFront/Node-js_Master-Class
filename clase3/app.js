const express = require('express');
const crypto = require('node:crypto');
const z = require('zod'); //importamos zod para validar los datos que nos llegan por el body

const movies = require('./movies.json');
const { validateMovie, validatePartialMovie } = require('./shcemaas/esquema');

const app = express();
app.disable('x-powered-by'); // deshabilitar el header x-powered-by
const ACCEPTED_ORIGIN = [
  'http://localhost:8080',
  'http://localhost:1234',
  'http://movies.com',
];
app.get('/', (req, res) => {
  const origin = req.header('origin');
  if (ACCEPTED_ORIGIN.includes(origin)) {
    res.header('Access-Control-Allow-Origin', '*'); // permite el acceso a cualquier origen
  }
  res.json({ message: 'Hola Mundo' });
});

app.get('/movies', (req, res) => {
  const { genre } = req.query; //aqui tenemos un objeto donde ya estan transformados los queryparans
  if (genre) {
    const moviesFiltered = movies.filter((movie) =>
      movie.genre.includes(genre)
    ); //includes es un metodo de string que devuelve true o false si el string contiene el valor que le pasamos);

    return res.json(moviesFiltered); //si no hay query param, devuelve todas las peliculas
  }
  return res.json(movies);
});

app.get('/movies/:id', (req, res) => {
  //path-to-regex
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: 'Pelicula no encontrada' });
  }
});

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body);

  if (!result.success) {
    // 422 Unprocessable Entity
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  // en base de datos
  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    ...result.data,
  };

  // Esto no sería REST, porque estamos guardando
  // el estado de la aplicación en memoria
  movies.push(newMovie);

  res.status(201).json(newMovie);
});

app.patch('/movies/:id', (req, res) => {
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


app.delete('/movies/:id', (req, res) => {
  const {id}=req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  movies.splice(movieIndex, 1);
  return res.status(204).json({ message: 'Movie deleted' }); 
})



const port = process.env.PORT ?? 5050; // si no existe la variable de entorno PORT, se usa el puerto 5050
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
