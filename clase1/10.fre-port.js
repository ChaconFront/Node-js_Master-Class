//protocolo tcp
const net = require('node:net');

function findAvailablePort(desiretPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer(); //se crea un servidor
    server.listen(desiretPort, () => {
      const { port } = server.address(); //se obtiene el puerto
      server.close(() => { 
        resolve(port); //se resuelve la promesa
      });
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        resolve(findAvailablePort(0)).then((port) => resolve(port));
      } else {
        reject(error);
      }
    });
  });
}

module.exports = { findAvailablePort };
