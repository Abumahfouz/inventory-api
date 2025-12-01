const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const {protect} = require('../middleware/authMiddleware');

// Protect all routes below
// router.use(protect);

// Create a new review
router.post('/',protect, reviewController.createReview);

// Get all reviews
router.get('/', reviewController.getAllReviews);

// Get a review by id
router.get('/:id', reviewController.getReviewById);

// Update a review by id
router.put('/:id', protect, reviewController.updateReviewById);

//Delete a review by id
router.delete('/:id', protect, reviewController.deleteReviewById);

module.exports = router;