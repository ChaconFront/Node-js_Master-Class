const fs = require('node:fs/promises');

//readFile, lee el archivo de manera asincrona y nos devuelve el contenido del archivo, el encoding es opcional
console.log('Leyendo el primer archivo');
//const text= fs.readFileSync('./archivo.txt', 'utf-8');// es sincrono

//las callbacks se ejecutan despues de que una tarea a terminado.
// es asincrono
fs.readFile('./archivo.txt', 'utf-8').then(text => {
  //promesas
  console.log(text);
});

console.log('---> hacer cualquier cosa mientras se lee el archivo.....');

console.log('Leyendo el segundo archivo... ');
fs.readFile('./archivo2.txt','utf-8').then(text => {
  console.log('segundo texto', text);
});
