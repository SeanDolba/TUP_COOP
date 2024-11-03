// paymentsRoute.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

// PayMongo Secret Key
const PAYMONGO_SECRET_KEY = process.env.REACT_APP_PAYMONGO_KEY_SECRET;

// Endpoint to create a payment source
router.post('/create-source', async (req, res) => {
    const { amount, currency, redirectUrl } = req.body;

    try {
        const response = await axios.post(
            'https://api.paymongo.com/v1/sources',
            {
                data: {
                    attributes: {
                        amount: amount * 100, // Convert to centavos if needed
                        currency,
                        type: "gcash", // Or "card" for card payments
                        redirect: {
                            success: redirectUrl.success,
                            failed: redirectUrl.failed,
                        },
                    },
                },
            },
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(PAYMONGO_SECRET_KEY).toString('base64')}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Send the payment URL back to the frontend
        res.status(200).json({ checkoutUrl: response.data.data.attributes.redirect.checkout_url });
    } catch (error) {
        res.status(500).json({ message: 'Error creating payment source', error: error.message });
    }
});

module.exports = router;
