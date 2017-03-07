const webapp = require('./webapp/routes');
const books = require('./books/routes');

module.exports = {
  '': webapp,
  '/api': books
};
