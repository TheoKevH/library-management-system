const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI).then(() => console.log("Database connected successfully")).catch(err => console.error("Database connection error:", err));

app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
