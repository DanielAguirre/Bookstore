const validation = (req, res, next) => {
  const body = req.body;
  const errors = [];
  console.log(req, body);
  if (!body.title) {
    errors.push({ msg: 'Title should not be empty' });
  }

  if (!body.ISBN) {
    errors.push({ msg: 'ISBN should not be empty' });
  } else if (body.ISBN.match(/(w{1,13})/g)) {
    errors.push({ msg: 'ISBN should max length 13 characters' });
  }

  if (body.publication && !body.publication.match(/(\d{4}-\d{1,2}-\d{1,2})/g)) {
    errors.push({ msg: 'Date should  valid format YYYY-MM-DD' });
  }

  if (!errors.length) next();
  else {
    res
      .status(422)
      .set('Content-Type', 'application/json')
      .send({ err: errors });
  }
};

module.exports = validation;
