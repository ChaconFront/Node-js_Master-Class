const os = require('node:os');

console.log('Informacion del Sistema Operativo:');
console.log('----------------------------------------------');

console.log('Nombre del sistema Operativo', os.platform());
console.log('Version del sistema Operativo', os.release());
console.log('Arquitectura', os.arch());
console.log('CPU', os.cpus());
console.log('Memoria libre', os.freemem() / 1024 / 1024);
console.log('Memoria Total', os.totalmem() / 1024 / 1024);
