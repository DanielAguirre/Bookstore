const db = require('../../db/book');

const book = {
  findOne(req, res) {
    return db
    .findOne(req.params.id)
    .then((paylaod) => {
      res
        .send(paylaod);
    });
  },

  get(req, res) {
    const query = req.query || {};
    db
      .find(query)
      .then((data) => {
        res
          .set('Content-Type', 'application/json')
          .json(data);
      });
  },

  create(req, res) {
    db
      .save(req.body)
      .then((payload) => {
        res
          .status(201)
          .set('Content-Type', 'application/json')
          .send(payload);
      });
  },
  update(req, res) {
    db
     .update(req.params.id, req.body)
     .then((payload) => {
        res
          .set('Content-Type', 'application/json')
          .send(payload);
      });
  },
};

module.exports = book;
