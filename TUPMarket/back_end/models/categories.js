// categories.js
const mongoose = require('mongoose');

// Define the schema for the 'categories' collection
const categorySchema = new mongoose.Schema({
  category_id: {
    type: Number,
    required: true,
    unique: true
  },
  category_name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

// Create the model from the schema
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
