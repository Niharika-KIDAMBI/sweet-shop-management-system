const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

/* REGISTER (CUSTOMER) */
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hash,
    role: 'USER'
  });

  res.status(201).json({ message: 'User registered' });
});

/* LOGIN (ADMIN + USER) */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token, role: user.role });
});

module.exports = router;
