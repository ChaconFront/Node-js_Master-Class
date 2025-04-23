import express from 'express';	


const port = process.env.PORT ?? 5050; // si no existe la variable de entorno PORT, se usa el puerto 5050
const app = express();


 



app.get('/', (req, res) => {
  res.send('Hello World!')
}) 

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
})
