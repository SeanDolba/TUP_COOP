const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../dbConfig');

router.get(`/`, (req, res) => {
    const userList = 'SELECT * FROM users';

    db.query(userList, (err, results) => {
        if (err) {
            console.error('Error retrieving data:', err);
            return res.status(500).send('An error occurred while retrieving data.');
        }

        if(!userList){
            res.status(500).json({success: false})
        }

        res.send(results);
    });
});

router.post(`/`, (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).send('Name and Email are required.');
    }

    const insert_user = 'INSERT INTO users (name, email) VALUES (?, ?)';

    db.query(insert_user, [name, email], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('An error occurred while inserting data.');
        }

        const newUser = { id: results.insertId, name, email };
        res.status(201).send(newUser);
    });
});

module.exports = router;