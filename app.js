const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config() 
const cookieParser = require('cookie-parser');
const { body, validationResult } = require('express-validator');
const path = require('path')
const cors = require('cors')
// connnect to database
mongoose.connect(`${process.env.MONGO_URL}`).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// Routes
app.use('/api/v1', require('./controller/imageUpload'));
app.use('/api/v1', require('./controller/auth'));


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));