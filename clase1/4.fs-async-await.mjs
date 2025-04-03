//const fs = require('node:fs/promises');
import fs from 'node:fs/promises';

(async () => {
  //readFile, lee el archivo de manera asincrona y nos devuelve el contenido del archivo, el encoding es opcional
  console.log('Leyendo el primer archivo');
  const text = await fs.readFile('./archivo.txt', 'utf-8');
  console.log('primer texto', text);

  console.log('---> hacer cualquier cosa mientras se lee el archivo.....');

  console.log('Leyendo el segundo archivo... ');
  const text2 = await fs.readFile('./archivo2.txt', 'utf-8');
  console.log('segundo texto', text2);
})();
