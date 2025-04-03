const http = require('node:http');
const { findAvailablePort } = require('./10.fre-port.js');

const desiredPort = process.env.PORT ?? 3333;

console.log('desiredPort', desiredPort);

const server = http.createServer((req, res) => {
  console.log('request received');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});
findAvailablePort(desiredPort).then((port) =>
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  })
);
