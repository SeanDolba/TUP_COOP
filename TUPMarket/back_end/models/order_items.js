// order_items.js
const mongoose = require('mongoose');

// Define the schema for the 'order_items' collection
const orderItemSchema = new mongoose.Schema({
  order_item_id: {
    type: Number,
    required: true,
    unique: true
  },
  order_id: {
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
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  }
});

// Create the model from the schema
const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;
