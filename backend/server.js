const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const { insertProducts } = require('./controllers/productController');
const { addToLikedProducts } = require('./controllers/userController'); // Import userController

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from frontend URL
  methods: ['GET', 'POST', 'PUT'],  // Allow GET, POST, and PUT requests
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow Content-Type and Authorization headers
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected");
  // Uncomment if you want to insert products initially
  // insertProducts(); 
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

// Routes
app.use('/api/auth', authRoutes); // Mount authRoutes at /api/auth
app.use('/api/products', productRoutes); // Mount productRoutes at /api/products
app.put('/api/users/:userId/liked-products/:productId', addToLikedProducts); // New route for adding liked products

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
