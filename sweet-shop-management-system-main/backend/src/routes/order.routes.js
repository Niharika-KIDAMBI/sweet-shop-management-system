const express = require('express');
const Order = require('../models/Order');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

/* USER: MY ORDERS */
router.get('/my', auth, async (req, res) => {
  const orders = await Order.find({ user: req.user.id })
    .populate('sweet');
  res.json(orders);
});

/* ADMIN: ALL ORDERS */
router.get('/', auth, async (req, res) => {
  if (req.user.role !== 'ADMIN')
    return res.status(403).json({ message: 'Forbidden' });

  const orders = await Order.find()
    .populate('user')
    .populate('sweet');

  res.json(orders);
});

/* PAYMENT (SIMULATED) */
router.post('/:id/pay', auth, async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (order.user.toString() !== req.user.id)
    return res.status(403).json({ message: 'Forbidden' });

  order.status = 'PAID';
  await order.save();

  res.json({ message: 'Payment successful', order });
});

module.exports = router;
