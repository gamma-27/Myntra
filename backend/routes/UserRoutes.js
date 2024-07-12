const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model defined

// Middleware to verify JWT token
const auth = (req, res, next) => {
  // Check for token in headers
  const token = req.header('Authorization')?.replace('Bearer ', '');


  if (!token) {
    return res.status(401).json({ message: 'Authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Set user object in request
    next(); // Proceed to next middleware
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Apply auth middleware to all routes in this router
router.use(auth);

// Route to fetch user profile
router.get('/profile', async (req, res) => {
  try {
    // Fetch user details from database based on userId in decoded token
    const user = await User.findById(req.user.userId).select('-password'); // Exclude password from user details
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Construct user profile response
    const userProfile = {
      userId: user._id,
      email: user.email,
      // Add more user details as needed
    };
    console.log(userProfile)

    res.json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
