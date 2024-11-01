// orders.js
const mongoose = require('mongoose');

// Define the schema for the 'orders' collection
const orderSchema = new mongoose.Schema({
  order_id: {
    type: Number,
    required: true,
    unique: true
  },
  user_id: {
    type: Number,
    required: true
  },
  total_price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  order_status: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Create the model from the schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
