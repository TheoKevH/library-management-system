const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const auth = require('../middleware/auth'); 

// POST endpoint to create a new book
router.post('/', auth, async (req, res, next) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    next(err); 
  }
});

// GET endpoint to get data of all the books (BONUS: search feature)
router.get('/', async (req, res, next) => {
  const { page = 1, search = '' } = req.query;
  const limit = 8;
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
    next(err);
  }
});

// GET endpoint to get data of a specific book
router.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
        const err = new Error('Book not found');
        err.statusCode = 404;
        return next(err);
    }
    res.json(book);
  } catch (err) {
    next(err);
  }
});

// PUT endpoint to edit a book
router.put('/:id', auth, async (req, res, next) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (err) {
    next(err);
  }
});

// DELETE endpoint to delete a book
router.delete('/:id', auth, async (req, res, next) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
