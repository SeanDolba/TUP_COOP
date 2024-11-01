const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../dbConfig');

// Register a new user
router.post('/register', async (req, res) => {
    const { tup_id, tup_email, password, first_name, last_name, phone } = req.body;
    
    // Check if email or TUP ID is already taken
    db.query('SELECT * FROM users WHERE tup_email = ? OR tup_id = ?', [tup_email, tup_id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (results.length > 0) {
            return res.status(400).json({ message: 'Email or TUP ID already exists' });
        }
        
        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 10);
        
        // Insert new user into database
        const query = 'INSERT INTO users (tup_id, tup_email, password, first_name, last_name, phone, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())';
        db.query(query, [tup_id, tup_email, hashedPassword, first_name, last_name, phone], (err) => {
            if (err) return res.status(500).json({ message: 'Database error' });
            res.json({ message: 'User registered successfully' });
        });
    });
});

// Login an existing user
router.post('/login', (req, res) => {
    const { tup_email, password } = req.body;

    // Check if user exists
    db.query('SELECT * FROM users WHERE tup_email = ?', [tup_email], (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (results.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

        const user = results[0];

        // Verify password
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ id: user.user_id, email: user.tup_email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        // Send user information and token
        res.json({
            message: 'Login successful',
            token,
            user: {
                user_id: user.user_id,
                tup_id: user.tup_id,
                first_name: user.first_name,
                last_name: user.last_name,
                phone: user.phone,
                created_at: user.created_at
            }
        });
    });
});

module.exports = router;
