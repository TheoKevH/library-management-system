const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  isbn: String,
  description: String,
}, {
  timestamps: true, 
});

module.exports = mongoose.model('Book', bookSchema);
