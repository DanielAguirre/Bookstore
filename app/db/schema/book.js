const mongoose = require('mongoose');

// native promises
mongoose.Promise = global.Promise;

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  ISBN: { type: String, required: true, unique: true },
  price: { type: Number, default: 0.0 },
  publication: Date,
  createdAt: Date,
});

bookSchema.virtual('date').get(function () {
  const date = new Date(this.publication);
  console.log(date);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
});

module.exports = mongoose.model('Book', bookSchema);

