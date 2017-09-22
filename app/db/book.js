const mongoose = require('mongoose');

const bookModel = mongoose.model('Book');

const Book = {
  findOne: id => bookModel.findOne({ _id: id }).exec(),

  find(query) {
    Object.keys(query)
    .forEach((key) => {
      if (query[key] && key !== 'price') {
        query[key] = new RegExp(`^${query[key]}`, 'i');
      }
    });
    return bookModel.find(query).exec();
  },
  save(data) {
    console.log('saving');
    return bookModel.create(data, function(err, data)  {
      console.log(err, data);
    });
  },
  update(id, modifications) {
    console.log('update')
    return bookModel.findByIdAndUpdate(id, { $set: modifications }, { new: true }).exec();
  },
};

module.exports = Book;
