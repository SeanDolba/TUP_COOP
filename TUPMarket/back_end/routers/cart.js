const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cart = require('../models/cart.js');
const CartItem = require('../models/cart_items.js');

// Retrieve Cart and Cart Items
router.get('/', async (req, res) => {
    try {
        const cartItems = await CartItem.find({ user_id: req.user.id })
            .populate('product_id') // Populate product details if needed
            .exec();

        if (!cartItems) {
            return res.status(404).json({ success: false, message: 'No items in cart' });
        }

        res.json(cartItems);
    } catch (error) {
        console.error('Error retrieving cart data:', error);
        res.status(500).send('An error occurred while retrieving cart data.');
    }
});

// Add Item to Cart
router.post('/', async (req, res) => {
    const { product_id, quantity } = req.body;

    try {
        // Check if the item is already in the cart
        let cartItem = await CartItem.findOne({ product_id, user_id: req.user.id });

        if (cartItem) {
            // Update the quantity if it exists
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            // Create a new cart item
            cartItem = new CartItem({
                product_id,
                user_id: req.user.id,
                quantity,
            });
            await cartItem.save();
        }

        res.json({ success: true, message: 'Item added to cart', cartItem });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).send('An error occurred while adding item to cart.');
    }
});

module.exports = router;
