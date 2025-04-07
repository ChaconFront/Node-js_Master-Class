import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  const { genre } = req.query; //aqui tenemos un objeto donde ya estan transformados los queryparans
  if (genre) {
    const moviesFiltered = movies.filter((movie) =>
      movie.genre.includes(genre)
    ); //includes es un metodo de string que devuelve true o false si el string contiene el valor que le pasamos);

    return res.json(moviesFiltered); //si no hay query param, devuelve todas las peliculas
  }
  return res.json(movies);
});
