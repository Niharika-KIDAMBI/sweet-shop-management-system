const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const sweetRoutes = require('./routes/sweet.routes');
const connectDB = require('./config/db');
const orderRoutes = require('./routes/order.routes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);

app.use('/api/orders', orderRoutes);

module.exports = app;
