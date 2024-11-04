const express = require('express');
const router = express.Router();
const Category = require('../models/category.js'); // Assuming a Mongoose model named Category

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find(); // Fetch all categories
        if (!categories || categories.length === 0) {
            return res.status(404).json({ success: false, message: 'No categories found' });
        }
        res.json(categories);
    } catch (error) {
        console.error('Error retrieving categories:', error);
        res.status(500).send('An error occurred while retrieving categories.');
    }
});

// Create a new category
router.post('/', async (req, res) => {
    const { category_name, description } = req.body;

    try {
        const newCategory = new Category({
            category_name,
            description,
        });

        await newCategory.save();
        res.status(201).json({ success: true, message: 'Category created', newCategory });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).send('An error occurred while creating the category.');
    }
});

module.exports = router;
