const path = require('path');
const express = require('express');
const middlewares = require('./middlewares');
const urls = require('./urls');


const ExpressServer = function () {
  const expressServer = express();

  // midlewares
  Object.keys(middlewares)
    .forEach((middleware) => {
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
