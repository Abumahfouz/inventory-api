const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { validateRole } = require('../middleware/roleMiddleware');
const app = require('../app');

// Create a new order - only customers can create orders
router.post('/', protect, validateRole, orderController.createOrder);

// Get all orders - only vendors can view all orders
router.get('/', protect, validateRole, orderController.getAllOrders);