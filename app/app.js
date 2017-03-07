const http = require('http');
const mongoose = require('mongoose');
const expressServer = require('./server/expressServer');

mongoose.connect(`mongodb://${process.env.MONGODB_PORT_27017_TCP_ADDR}/books`)

const server = new http.createServer(expressServer());
if (!module.parent) {
  server.listen(3000, () =>{
    console.log('app runining in port 3000');
  });
}else {
  module.exports = server;
}