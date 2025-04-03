//const fs = require('node:fs/promises');
import { readFile } from 'node:fs/promises';

//Ejecucion de promesas en paralelo.
Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8'),
]).then(([text, text2]) => {
  console.log('primer texto', text);
  console.log('segundo texto', text2);
});
