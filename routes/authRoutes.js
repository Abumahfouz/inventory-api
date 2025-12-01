const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User Registration
router.post('/register', authController.createUser);

// User Login
router.post('/login', authController.login);

// Get All Users
router.get('/', authController.getUsers);

module.exports = router;