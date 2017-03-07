const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// native promises
mongoose.Promise = global.Promise;

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: String,
  ISBN: { type: String, required: true, unique: true },
  price: { type: Number, default: 0.0 },
  publication: Date,
  createdAt: Date,
});


bookSchema.virtual('date').get(function() {
  const date = new Date(this.publication);
  return `${date.getFullYear()}- ${date.getMonth() + 1}-${date.getDate()}`;
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
