//argumentos de entradas a la hora de ejecutar nuestro proceso
//console.log(process.argv)

//controlar el proceso de salida
//process.exit(0); //0 es que todo salio bien, 1 es que hubo un error

//podemos escuchar eventos del proceso
process.on('exit', () => {
  //limpiar los recursos
});

//desde que carpeta se esta ejecutando el directorio
console.log(process.cwd());


//plattform
console.log(process.platform);