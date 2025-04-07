
//el sistema de modulos de node es lo que nos permite compartir codigo enjavascript


import express,{json} from 'express'; 
import {randomUUID} from 'node:crypto'; 
//import movies from './movies.json' assert {type: 'json'}; //esta sintaxis no existe
import { validateMovie, validatePartialMovie } from './shcemaas/esquema.js';
import { readJSON } from './utils.js';

const movies =readJSON('./movies.json'); 

const app = express();
app.disable('x-powered-by'); 
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
    ); 

    return res.json(moviesFiltered); 
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
    id: randomUUID(), // uuid v4
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
