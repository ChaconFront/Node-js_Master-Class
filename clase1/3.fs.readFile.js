const fs = require('node:fs');
//const {promisify}= require('node:util');

//const readFilePromise = promisify(fs.readFile);
//readFile, lee el archivo de manera asincrona y nos devuelve el contenido del archivo, el encoding es opcional
console.log('Leyendo el primer archivo');

//las callbacks se ejecutan despues de que una tarea a terminado.
// es asincrono
fs.readFile('./arc hivo.txt', 'utf-8', (err, text) => {
  console.log(text);
});

console.log('---> hacer cualquier cosa mientras se lee el archivo.....');

console.log('Leyendo el segundo archivo... ');
fs.readFile('./archivo2.txt', 'utf-8', (err, text) => {
  console.log('segundo texto', text);
});
