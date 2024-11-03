const express = require('express');
const router = express.Router();
const axios = require('axios');

const PAYMONGO_SECRET_KEY = process.env.REACT_APP_PAYMONGO_KEY_SECRET;

router.post('/create-source', async (req, res) => {
    const { amount, type, currency, redirectUrl } = req.body;

    try {
        const response = await axios.post(
            'https://api.paymongo.com/v1/sources',
            {
                data: {
                    attributes: {
                        amount,
                        currency,
                        type,
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

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error creating payment source', error: error.message });
    }
});

module.exports = router;
