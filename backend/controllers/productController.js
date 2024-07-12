const Product = require('../models/Product');

// Function to insert products into the database
const insertProducts = async () => {
  try {
    const products = [
      {
        "productId": 11,
        "category": "Jeans",
        "product": "Wide leg Ripped Jeans",
        "imageUrl": "https://i.pinimg.com/736x/99/6b/2d/996b2d0197ef7683bae47dd127a43811.jpg",
        "likes": 0,
        "likedBy": [] // Initialize likedBy array
      },
    ];

    const insertedProducts = await Product.insertMany(products);
    console.log('Products inserted successfully!');
    
    return insertedProducts; // Return inserted products or IDs
  } catch (error) {
    console.error('Error inserting products:', error);
    throw error; // Re-throw error for handling in caller function
  }
};

// Controller function to update like count for a product
const updateLikes = async (req, res) => {
  const productId = req.params.productId;
  const action = req.body.action; // 'like' or 'unlike'
  const userId = req.body.userId; // Ensure userId is passed in the request body

  try {
    // Find the product by productId
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update like count based on action
    if (action === 'like') {
      // Check if userId is provided and not already in likedBy array
      if (userId && !product.likedBy.includes(userId)) {
        product.likedBy.push(userId); // Add userId to likedBy array
      }
      product.likes += 1;
    } else if (action === 'unlike') {
      if (product.likes > 0) {
        // Remove userId from likedBy array if it exists
        if (userId) {
          product.likedBy = product.likedBy.filter(id => id !== userId);
        }
        product.likes -= 1;
      } else {
        return res.status(400).json({ message: 'Cannot unlike, likes are already 0' });
      }
    }

    // Save updated product to database
    const updatedProduct = await product.save();

    // Return updated product or success message
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating like count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { insertProducts, updateLikes };
