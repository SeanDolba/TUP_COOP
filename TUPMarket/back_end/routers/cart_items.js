const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../dbConfig');

router.get(`/`, (req, res) => {
    const cart_itemsList = 'SELECT * FROM cart_items';

    db.query(cart_itemsList, (err, results) => {
        if (err) {
            console.error('Error retrieving data:', err);
            return res.status(500).send('An error occurred while retrieving data.');
        }

        if(!cart_itemsList){
            res.status(500).json({success: false})
        }

        res.send(results);
    });
});

router.post(`/`, (req, res) => {
   
});

module.exports = router;