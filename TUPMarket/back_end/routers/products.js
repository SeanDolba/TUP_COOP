const express = require('express');
const router = express.Router();
const Product = require('../models/products.js'); // Assuming you have a Mongoose model named Product

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from the database
        if (!products || products.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found' });
        }
        res.json(products); // Send the list of products as a JSON response
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).send('An error occurred while retrieving products.');
    }
});

// Create a new product
router.post('/', async (req, res) => {
    const { category_id, product_name, description, price, stock, image_url } = req.body; // Destructure product data from the request body

    try {
        const newProduct = new Product({
            category_id,
            product_name,
            description,
            price,
            stock,
            image_url,
            created_at: new Date() // Set created_at to the current date
        });

        await newProduct.save(); // Save the new product to the database
        res.status(201).json({ success: true, message: 'Product created', newProduct }); // Respond with the created product
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('An error occurred while creating the product.');
    }
});

module.exports = router;
