const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { requireAuth } = require('../middleware/auth')
const { body, validationResult } = require('express-validator');


// Signup route
router.post('/signup',
  [
    body('name').isLength({ min: 3 }).withMessage('Name Should be at least 3 chars long'),
    body('email').isEmail().normalizeEmail().withMessage('Please Enter Valid Email'),
    body('password').isLength({ min: 6 }).withMessage('must be at least 6 chars long')
      .matches(/\d/)
      .withMessage('must contain a number'),
  ], async (req, res) => {
    const { name, email, password } = req.body;
    

    // validate form
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.errors[0].msg });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: 'User already exists' });
    }
    if (!user) {
        user = new User({
            name,
            email,
            password
          });
  
          // Hash password
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);
          // Save user to database
          await user.save();
    }
    res.json({ message: 'User registered successfully' });
  });


// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Create and sign JWT token
  const payload = { user: { id: user.id } };
  const secret = 'mysecretkey';
  jwt.sign(payload, secret, { expiresIn: 3600000000 }, (err, token) => {
    if (err) throw err;
    // Save token in cookie
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful', token: token, });
  });
});




router.get('/auth', async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify the JWT token
    const decodedToken = jwt.verify(token, 'mysecretkey');

    // Check if user exists
    const user = await User.findById(decodedToken.user.id);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    res.json({ user });
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
});



// Example of a protected route
router.get('/profile', requireAuth, async (req, res) => {
  const userId = req.user.user.id;

  const user = await User.findById(userId);
  res.json({ user });
});


router.get('/logouts', (req, res) => {
  res.clearCookie('token');
  res.cookie('token', token, { maxAge: 900000, httpOnly: true });
  res.json({ message: 'logout successfully' })
})
module.exports = router;
