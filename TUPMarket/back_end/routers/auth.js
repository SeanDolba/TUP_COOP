const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users'); // Adjust the path as needed

// Register a new user
router.post('/register', async (req, res) => {
    const { tup_id, tup_email, password, first_name, last_name, phone } = req.body;

    try {
        // Check if email or TUP ID is already taken
        const existingUser = await User.findOne({ $or: [{ tup_email }, { tup_id }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or TUP ID already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document
        const newUser = new User({
            tup_id,
            tup_email,
            password: hashedPassword,
            first_name,
            last_name,
            phone,
            created_at: new Date()
        });

        // Save new user to the database
        await newUser.save();
        res.json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Database error' });
    }
});

// Login an existing user
router.post('/login', async (req, res) => {
    const { tup_email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ tup_email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.user_id, email: user.tup_email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

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
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Database error' });
    }
});

module.exports = router;
