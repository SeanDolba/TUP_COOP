// cart_items.js
const mongoose = require('mongoose');

// Define the schema for the 'cart_items' collection
const cartItemSchema = new mongoose.Schema({
  cart_item_id: {
    type: Number,
    required: true,
    unique: true
  },
  cart_id: {
    type: Number,
    required: true
  },
  product_id: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

// Create the model from the schema
const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
