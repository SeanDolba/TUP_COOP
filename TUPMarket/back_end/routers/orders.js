const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../dbConfig');

router.get(`/`, (req, res) => {
    const ordersList = 'SELECT * FROM orders';

    db.query(ordersList, (err, results) => {
        if (err) {
            console.error('Error retrieving data:', err);
            return res.status(500).send('An error occurred while retrieving data.');
        }

        if(!ordersList){
            res.status(500).json({success: false})
        }

        res.send(results);
    });
});

router.post(`/`, (req, res) => {
   
});

module.exports = router;