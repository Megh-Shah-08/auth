// user.js
const mongoose = require('mongoose');

// Define the schema for a user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Trims any leading or trailing spaces
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [50, 'Username cannot be longer than 50 characters'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Email is invalid'], // Email regex validation
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the current date/time when the user is created
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically set the current date/time when the user is created
  },
});

// Add a method to update the `updatedAt` field whenever a document is modified
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
