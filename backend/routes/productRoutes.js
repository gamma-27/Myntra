const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { updateLikes } = require('../controllers/productController');

// Route to update like count for a product
router.put('/:productId/likes', updateLikes);

// Route to fetch all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

module.exports = router;
