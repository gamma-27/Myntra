const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productId: Number,
  category: String,
  product: String,
  imageUrl: String,
  likes: { type: Number, default: 0 },
  // Add likedBy field to store userIds of users who liked this product
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Assuming User model exists
});

module.exports = mongoose.model('Product', productSchema);
