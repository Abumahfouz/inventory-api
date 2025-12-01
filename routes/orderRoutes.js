const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { validateRole } = require('../middleware/roleMiddleware');

// Create a new order - only customers can create orders
router.post('/', protect, validateRole('customer'), orderController.createOrder);

// Get all orders - only vendors can view all orders
// router.get('/', protect, validateRole, orderController.getAllOrders);

module.exports = router;