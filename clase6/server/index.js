import express from 'express';
import logger from 'morgan'; //morgan funciona como midleware es un loger es una herramienta que nos ayuda a ver los logs de las peticiones que llegan al servidor

const port = process.env.PORT ?? 5050; // si no existe la variable de entorno PORT, se usa el puerto 5050
const app = express();

app.use(logger('dev')); //dev es un formato de morgan que nos muestra los logs en la consola de una manera mas amigable

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html'); //es la carpeta donde sde ha inicializado el proceso.
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
