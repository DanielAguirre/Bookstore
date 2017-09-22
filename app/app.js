// import all of our models
require('./db/schema/book');
const http = require('http');
const mongoose = require('mongoose');
const expressServer = require('./server/expressServer');

const PORT = process.env.PORT || 3000;
// Connect to our Database and handle an bad connections

mongoose.connect(`${process.env.DATABASE_URL}`);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

const server = new http.createServer(expressServer());
if (!module.parent) {
  server.listen(process.env.PORT || 3000, () => {
    console.log(`app runining in port ${PORT}`);
  });
} else {
  module.exports = server;
}
