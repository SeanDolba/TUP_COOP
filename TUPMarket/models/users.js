// users.js
const mongoose = require('mongoose');

// Define the schema for the 'users' collection
const userSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
