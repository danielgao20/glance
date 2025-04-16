// backend/routes/profile.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Configure multer for profile image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/profiles');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `profile-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// GET current user profile
router.get('/', auth, async (req, res) => {
  try {
    // User is already attached to req by auth middleware
    const user = req.user;
    
    // Return user profile data (excluding password)
    res.json({
      username: user.username,
      displayName: user.displayName || user.username,
      profileImage: user.profileImage,
      created_at: user.created_at
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE user profile
router.put('/', auth, upload.single('profileImage'), async (req, res) => {
  try {
    const updates = {};
    
    // Update display name if provided
    if (req.body.displayName) {
      updates.displayName = req.body.displayName;
    }
    
    // Update profile image if a file was uploaded
    if (req.file) {
      // Create URL for the uploaded image
      const profileImageUrl = `/uploads/profiles/${req.file.filename}`;
      updates.profileImage = profileImageUrl;
      
      // If user already had a profile image, delete the old one
      if (req.user.profileImage) {
        const oldImagePath = path.join(__dirname, '..', req.user.profileImage);
        // Check if file exists before attempting to delete
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }
    
    // Update user in database
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json({
      username: updatedUser.username,
      displayName: updatedUser.displayName || updatedUser.username,
      profileImage: updatedUser.profileImage,
      created_at: updatedUser.created_at
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;