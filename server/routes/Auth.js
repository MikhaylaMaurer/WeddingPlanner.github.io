const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Route for user login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // If the password is correct, generate a JWT token
    const token = jwt.sign({ userId: user._id, username: user.username }, 'your_secret_key', { expiresIn: '1h' });

    // Send the token in the response
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Other authentication routes (e.g., logout, register) would be defined similarly

module.exports = router;
