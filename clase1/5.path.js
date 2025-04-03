const path = require('node:path');
//unir rutas con path.join

console.log(path.sep); //separacion de barras en mi sistema operativo.
const filePath = path.join('content', 'subfolder', 'test.txt');//unir rutas
console.log(filePath);

const base = path.basename(filePath);//obtener el nombre del archivo
console.log(base);

const extension= path.extname('my.super.image.jpg');//obtener la extension del archivo
console.log(extension);