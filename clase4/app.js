
//el sistema de modulos de node es lo que nos permite compartir codigo enjavascript
import express, {json} from 'express';
import moviesRouter from './routes/movies.js';
import { corsMiddleware } from './middlewares/cors.js'


const app = express();
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/movies',moviesRouter); 




const port = process.env.PORT ?? 5050; // si no existe la variable de entorno PORT, se usa el puerto 5050
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
