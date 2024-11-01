// products.js
const mongoose = require('mongoose');

// Define the schema for the 'products' collection
const productSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    required: true,
    unique: true
  },
  category_id: {
    type: Number,
    required: true
  },
  product_name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  image_url: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Create the model from the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
