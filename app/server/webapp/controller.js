const db = require('../../db/book');

const home = {
  index(req, res) {
    db
      .find({})
      .then((books) => {
        res
          .render('index', {
            pageTitle: 'BookStore',
            books,
          });
      });
  },
  add(req, res) {
    res.render('add', {
      pageTitle: 'Add A Book',
      authors: ['Author 1', 'Author 2', 'Author 3', 'Author 4', 'Author 5'],
      book: {},
    });
  },
  edit(req, res) {
    db
    .findOne(req.params.id)
    .then((book) => {
      const date = new Date(book.publication);
      book.date = `${date.getFullYear()}- ${date.getMonth() + 1}-${date.getDate()}`;
      res.render('add', {
        pageTitle: 'Edit  A Book',
        authors: ['Author 1', 'Author 2', 'Author 3', 'Author 4', 'Author 5'],
        book,
      });
    });
  },
};

module.exports = home;
