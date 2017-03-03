const path = require('path');
const express = require('express');
const urls = require('./urls');

const ExpressServer = function() {
  const expressServer = express();

  // template
  expressServer.set('views', path.join(__dirname, '/webapp/views'));
  expressServer.set('view engine','pug');

  // Routes
  Object.keys(urls)
    .forEach(url => {
      expressServer.use(url, urls[url]);
    });

    return expressServer;
}


module.exports = ExpressServer;