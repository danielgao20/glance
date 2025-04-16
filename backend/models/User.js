// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: { type: String },
  profileImage: { type: String }, // Store path or URL to image
  created_at: { type: Date, default: Date.now },
  token: { type: String },
});

module.exports = mongoose.model('User', userSchema);