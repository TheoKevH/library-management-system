const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// POST endpoint to register a new user
router.post('/register', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    next(err); 
  }
});

// POST endpoint to login a user
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 404;
    return next(err);
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    const err = new Error('Invalid password');
    err.statusCode = 401;
    return next(err);
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
