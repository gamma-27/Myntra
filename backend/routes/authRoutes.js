// authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userRoutes = require('./userRoutes'); // Import userRoutes

// Authentication routes
router.post('/login', authController.login);
router.post('/register', authController.register);

// Mount userRoutes under /auth
router.use('/user', userRoutes);

module.exports = router;
