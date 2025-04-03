const http = require('node:http');
const fs = require('node:fs');
const desiredPort = process.env.PORT ?? 3333;

console.log('desiredPort', desiredPort);

const processRequest = (req, res) => {
  if (req.url === '/') {
    res.end('<h1>Mi pagina</h1>');
  } else if (req.url === '/about') {
    res.end('<h1>About</h1>');
  } else if (req.url === '/image.png') {
    fs.readFile('./placa.jpg', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('<h1>500 Internal server Error</h1>');
      } else {
        res.setHeader('Content-Type', 'image/jpg');
        res.writeHead(200);
        res.end(data);
      }
    });
  }
};
const server = http.createServer(processRequest).listen(desiredPort, () => {
  console.log(`Server running at http://localhost:${desiredPort}/`);
});
