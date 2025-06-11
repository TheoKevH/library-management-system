const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// POST endpoint to create a new book
router.post('/', async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET endpoint to get data of all the books (BONUS: search feature)
router.get('/', async (req, res) => {
  const { page = 1, search = '' } = req.query;
  const limit = 10;
  const query = {
    $or: [
      { title: new RegExp(search, 'i') },
      { author: new RegExp(search, 'i') },
    ]
  };
  try {
    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const count = await Book.countDocuments(query);

    res.json({
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET endpoint to get data of a specific book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT endpoint to edit a book
router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE endpoint to delete a book
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
