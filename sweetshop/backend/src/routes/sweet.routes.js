const express = require('express');
const Sweet = require('../models/sweet');
const Order = require('../models/Order');
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');

const router = express.Router();

/* =========================
   VIEW ALL SWEETS
   (ADMIN + USER)
========================= */
router.get('/', auth, async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch {
    res.status(500).json({ message: 'Failed to fetch sweets' });
  }
});

/* =========================
   ADD SWEET (ADMIN)
========================= */
router.post('/', auth, role('ADMIN'), async (req, res) => {
  try {
    const sweet = await Sweet.create(req.body);
    res.status(201).json(sweet);
  } catch {
    res.status(500).json({ message: 'Failed to add sweet' });
  }
});

/* =========================
   RESTOCK SWEET (ADMIN)
========================= */
router.put('/:id/restock', auth, role('ADMIN'), async (req, res) => {
  console.log('--- RESTOCK HIT ---');
  console.log('USER:', req.user);
  console.log('BODY:', req.body);
  console.log('PARAM ID:', req.params.id);

  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid quantity' });
  }

  const sweet = await Sweet.findById(req.params.id);
  if (!sweet) {
    return res.status(404).json({ message: 'Sweet not found' });
  }

  sweet.quantity += quantity;
  await sweet.save();

  res.json(sweet);
});


/* =========================
   PURCHASE SWEET (USER)
   WITH QUANTITY
========================= */
router.post('/:id/purchase', auth, role('USER'), async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Deduct stock
    sweet.quantity -= quantity;
    await sweet.save();

    // Create order
    const order = await Order.create({
      user: req.user.id,
      sweet: sweet._id,
      quantity,
      price: sweet.price * quantity,
      status: 'PAID'
    });

    res.json({ message: 'Purchase successful', order });
  } catch {
    res.status(500).json({ message: 'Purchase failed' });
  }
});

module.exports = router;
