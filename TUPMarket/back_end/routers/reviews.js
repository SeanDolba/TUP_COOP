const express = require('express');
const router = express.Router();
const Review = require('../models/Review'); // Assuming you have a Mongoose model named Review

// Get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find(); // Fetch all reviews from the database
        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ success: false, message: 'No reviews found' });
        }
        res.json(reviews); // Send the list of reviews as a JSON response
    } catch (error) {
        console.error('Error retrieving reviews:', error);
        res.status(500).send('An error occurred while retrieving reviews.');
    }
});

// Create a new review
router.post('/', async (req, res) => {
    const { product_id, user_id, rating, comment } = req.body; // Destructure review data from the request body

    try {
        const newReview = new Review({
            product_id,
            user_id,
            rating,
            comment,
            created_at: new Date() // Set created_at to the current date
        });

        await newReview.save(); // Save the new review to the database
        res.status(201).json({ success: true, message: 'Review created', newReview }); // Respond with the created review
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).send('An error occurred while creating the review.');
    }
});

module.exports = router;
