const Reviews = require('../models/reviewModel');

// Controller to get all reviews
const getAllReviews = async (req, res) => {
    try {
        // Logic to get all reviews from the database
        const reviews = await Reviews.find({});
        res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
        console.error(error);
    }
}

// Get a review by id
const getReviewById = async (req, res) => {
    try {
        const reviewId = req.params.id;
        // Logic to get a review by id from the database
        const userId = req.user ? req.user._id : null;
        const review = await Reviews.findById(reviewId)
        .populate('product', 'name')
        .populate('user', 'email')
        ;
        if (!review) {
            return res.status(404).json({ success: false, message: 'review not found' });
        }
        res.status(200).json({ success: true, data: review });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
        console.error(error);
    }
}

// Controller to create a new review
const createReview = async (req, res) => {
    try {
        // Logic to create a new review in the database
        const { product, title, comment, rating } = req.body;
        if (!title || !comment || !rating || !product) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        console.log('Creating review for user:', req.user);
        const newReview = await Reviews.create({ product: req.body.product, title, comment, rating, user: req.user.userId });
        res.status(201).json({ success: true, data: newReview });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
        console.error(error);
    }
}

//Update a review by id
const updateReviewById = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const updates = req.body;
        // Logic to update a review by id in the database
        const updatedReview = await Reviews.findByIdAndUpdate(reviewId, updates,
            { new: true, runValidators: true });
        if (!updatedReview) {
            return res.status(404).json({ success: false, message: 'review not found' });
        }
        res.status(200).json({ success: true, data: updatedReview });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
        console.error(error);
    }
}

// Delete a review by id
const deleteReviewById = async (req, res) => {
    try {
        const reviewId = req.params.id;
        // Logic to delete a review by id from the database
        const deletedReview = await Reviews.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }
        res.status(204).json({ success: true, message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
        console.error(error);
    }
}

// Exporting the controller functions
module.exports = {
    getAllReviews,
    createReview,
    getReviewById,
    updateReviewById,
    deleteReviewById
};