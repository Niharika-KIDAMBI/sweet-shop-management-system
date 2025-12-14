const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sweet',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number, // total price
    required: true
  },
  status: {
    type: String,
    enum: ['PAID'],
    default: 'PAID'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);
