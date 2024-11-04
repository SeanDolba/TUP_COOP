const express = require('express');
const router = express.Router();
const OrderItem = require('../models/OrderItem'); // Assuming a Mongoose model named OrderItem

// Get all order items
router.get('/', async (req, res) => {
    try {
        const orderItems = await OrderItem.find(); // Fetch all order items
        if (!orderItems || orderItems.length === 0) {
            return res.status(404).json({ success: false, message: 'No order items found' });
        }
        res.json(orderItems);
    } catch (error) {
        console.error('Error retrieving order items:', error);
        res.status(500).send('An error occurred while retrieving order items.');
    }
});

// Create a new order item
router.post('/', async (req, res) => {
    const { order_id, product_id, quantity, price } = req.body;

    try {
        const newOrderItem = new OrderItem({
            order_id,
            product_id,
            quantity,
            price,
        });

        await newOrderItem.save();
        res.status(201).json({ success: true, message: 'Order item created', newOrderItem });
    } catch (error) {
        console.error('Error creating order item:', error);
        res.status(500).send('An error occurred while creating the order item.');
    }
});

module.exports = router;
