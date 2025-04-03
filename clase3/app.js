const express = require('express');
const crypto = require('node:crypto');
const z = require('zod'); //importamos zod para validar los datos que nos llegan por el body

const movies = require('./movies.json');
const { validateMovie, validatePartialMovie } = require('./shcemaas/esquema');

const app = express();
app.disable('x-powered-by'); // deshabilitar el header x-powered-by

app.get('/', (req, res) => {
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

  console.log(result);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.format(),
    });
  }
  const newMovie = {
    id: crypto.randomUUID(), //esto genera un id aleatorio
    ...result.data,
  };
  movies.push(newMovie); //agregamos la nueva pelicula al array de peliculas
  return res.status(201).json(newMovie); //devolvemos la nueva pelicula con el status 201 (creado)
});

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: JSON.parse(result.error.message),
    });
  }
  const { id } = req.params;
  const moviesIndex = movies.findIndex((movies) => movies.id === id);
  if (moviesIndex == -1) {
    return res.status(404).json({ error: 'Pelicula no encontrada' });
  }

const updateMovie={
  ...movies[moviesIndex],
  ...result.data,
}
movies[moviesIndex]=updateMovie; //actualizamos la pelicula en el array de peliculas
return res.status(200).json(updateMovie); 

});




const port = process.env.PORT ?? 5050; // si no existe la variable de entorno PORT, se usa el puerto 5050
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
