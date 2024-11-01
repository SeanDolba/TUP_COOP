// reviews.js
const mongoose = require('mongoose');

// Define the schema for the 'reviews' collection
const reviewSchema = new mongoose.Schema({
  review_id: {
    type: Number,
    required: true,
    unique: true
  },
  product_id: {
    type: Number,
    required: true
  },
  user_id: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Create the model from the schema
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
