const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

// Create a new product
router.post('/', protect, productController.createProduct);

// Get all products
router.get('/', productController.getAllProducts);

// Get a product by id
router.get('/:id', productController.getProductById);

// Update a product by id
router.put('/:id', protect, productController.updateProductById);

//Delete a product by id
router.delete('/:id', protect, productController.deleteProductById);

module.exports = router;