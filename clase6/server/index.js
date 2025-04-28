import express from 'express';
import logger from 'morgan'; //morgan funciona como midleware es un loger es una herramienta que nos ayuda a ver los logs de las peticiones que llegan al servidor

import { server } from 'socket.io';
import { createServer } from 'node:http';

const port = process.env.PORT ?? 5050;
50;
const app = express();
const server= createServer(app);   

const io = new Server(server);

io.on('connection', () => {
  console.log('a user has connected');
});
app.use(logger('dev')); //dev es un formato de morgan que nos muestra los logs en la consola de una manera mas amigable

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html'); //es la carpeta donde sde ha inicializado el proceso.
});
server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
