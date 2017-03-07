const express = require('express');
const bookController = require('./controller');
const validation = require('./validation');

const router = express.Router();

router.get('/books', bookController.get);

router
  .route('/books/:id?')
  .get(bookController.findOne)
  .post(validation, bookController.create)
  .put(bookController.update)
  ;

module.exports = router;
