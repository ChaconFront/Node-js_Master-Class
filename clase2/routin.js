const http = require('node:http');
const dittoJson = require('./pokemon/ditto.json');

const processRequest = (req, res) => {
  const { method, url } = req;
  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.end(JSON.stringify(dittoJson));
        default:
          res.writeHead(404);
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.end('<h1>404 Not Found</h1>');
      }
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''
          //escuchar el evento data
          req.on('data', chunk => {
            body += chunk.toString(); // convertir el buffer a string
          })
            //escuchar el evento end
          req.on('end', () => {
            const data = JSON.parse(body);
            res.writeHead(201, { 'Content-Type': 'application/json ; charset=utf-8' });
           data.timestamp= Date.now() //cuando se ha creado
            res.end(JSON.stringify(data))
          })
          break;
        }
        default:
          res.writeHead(404);
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          return res.end('<h1>404 Not Found</h1>');
      }

    default:
      break;
  }
};

const server = http.createServer(processRequest);

server.listen(5050, () => {
  console.log('Server running at http://localhost:5050/');
});
