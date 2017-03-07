const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const urls = require('./urls');


const ExpressServer = function () {
  const expressServer = express();

  // midlewares
  expressServer.use(bodyParser.json());
  
  Object.keys(middlewares)
    .forEach((middleware) => {
      console.log({middleware: middlewares[middleware]});
      expressServer.use(middlewares[middleware]);
    });

  // template
  expressServer.set('views', path.join(__dirname, '/webapp/views'));
  expressServer.set('view engine', 'pug');

  // Routes
  Object.keys(urls)
    .forEach((url) => {
      expressServer.use(url, urls[url]);
    });

  return expressServer;
};


module.exports = ExpressServer;
