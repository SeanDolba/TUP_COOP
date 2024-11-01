const express = require('express');
const router = express.Router();
const CartItem = require('../models/cart_items'); // Adjust path if necessary

// Get all cart items
router.get('/', async (req, res) => {
    try {
        const cartItems = await CartItem.find(); // Retrieves all documents in the cart_items collection
        res.status(200).json(cartItems);
    } catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ message: 'An error occurred while retrieving data.' });
    }
});

// Add a new cart item
router.post('/', async (req, res) => {
    const { cart_item_id, cart_id, product_id, quantity } = req.body;

    // Create a new cart item document
    const newCartItem = new CartItem({
        cart_item_id,
        cart_id,
        product_id,
        quantity
    });

    try {
        const savedCartItem = await newCartItem.save(); // Saves the document to the database
        res.status(201).json(savedCartItem);
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).json({ message: 'An error occurred while saving data.' });
    }
});

module.exports = router;
