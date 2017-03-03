const http = require('http');
const expressServer = require('./server/expressServer');

//const app = Object.assign({}, expressServer());

const server = new http.createServer(expressServer());

server.listen(3000, () =>{
  console.log('app runining in port 3000');
})
