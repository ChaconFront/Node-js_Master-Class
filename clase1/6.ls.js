const fs = require('node:fs');

// readdir, lee el directorio de manera asincrona y nos devuelve un array con los nombres de los archivos
// y carpetas que contiene el directorio
/* fs.readdir('.', (err, files) => {
  if (err) {
    console.error('Error leyendo el directorio', err);
    return;
  }
  files.forEach((file) => {
    console.log(file);
  });
});
 */

/*otra forma de hacerlo */
fs.readdir('.')
  .then((files) => {
    files.forEach((element) => {
      console.log(element);
    });
  })
  .catch((err) => {
    console.log('Error al leer el directorio:', err);
    return;
  });
