// cart.js
const mongoose = require('mongoose');

// Define the schema for the 'cart' collection
const cartSchema = new mongoose.Schema({
  cart_id: {
    type: Number,
    required: true,
    unique: true
  },
  user_id: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Create the model from the schema
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
