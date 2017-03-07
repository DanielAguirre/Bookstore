const bookModel = require('./schema/Book');

const Book = {
  findOne(id) {
    console.log({find:id})
    return bookModel.findOne({_id: id}).exec();
  },
  find(query) {
    return bookModel.find(query).exec();
  },
  save(data) {
    return bookModel.create(data);
  },
  update(id, modifications){
    return bookModel.findByIdAndUpdate(id, { $set: modifications }, { new: true }).exec();
  },
}

module.exports = Book;