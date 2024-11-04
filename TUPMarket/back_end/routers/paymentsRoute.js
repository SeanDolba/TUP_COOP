const express = require('express');
const router = express.Router();
const paymongo = require('@api/paymongo');
paymongo.auth(process.env.PAYMONGO_KEY_SECRET); // Use the correct environment variable for the secret key

// Route to create a payment source
router.post('/create-source', async (req, res) => {
    const { amount, currency, redirectUrl } = req.body;
    try {
        const source = await paymongo.createALink({
            data: {
                attributes: {
                    amount: amount,
                    description: 'Checkout',
                    redirect: {
                        success: redirectUrl.success,
                        failed: redirectUrl.failed
                    },
                    currency
                }
            }
        });
        res.json({ checkoutUrl: source.data.attributes.checkout_url });
    } catch (error) {
        console.error("Error creating payment source:", error);
        res.status(500).json({ message: 'Failed to create payment source' });
    }
});

module.exports = router;
