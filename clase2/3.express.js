const express = require('express');
const ditto = require('./pokemon/ditto.json'); // importar el json de ditto
const e = require('express');
const app = express();

app.disable('x-powered-by'); // deshabilitar el header x-powered-by

/*los middleware son funciones que se ejecutan entre la peticion y la respuesta*/
//app.use(express.json()); // middleware para parsear el body de la peticion a json 

app.use((req, res, next) => {
  if (req.method !== 'POST') return next();
  if (req.headers['content-type'] !== 'application/json') return next();

  // solo llegan request que son POST y que tienen el header content-type application/json
  let body = '';

  //escuchar el evento data
  req.on('data', (chunk) => {
    body += chunk.toString(); // convertir el buffer a string
  });

  //escuchar el evento end
  req.on('end', () => {
    const data = JSON.parse(body);// convierte los datos string enviados del cliente en un objeto
    data.timestamp = Date.now();

    //mutar la request y meter la informacion en el req.body
    req.body = data;

    next(); // continuar con la siguiente funcion middleware
  });
});



const port = process.env.PORT ?? 5050;

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto);
});

app.post('/pokemon', (req, res) => {
  //deberiamos guardar en bases de datos
 res.status(201).json(req.body); // enviar el body de la peticion como respuesta
});


app.use((req, res) => {
  res.status(404).send('<h1>ERROR 404</h1>');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
