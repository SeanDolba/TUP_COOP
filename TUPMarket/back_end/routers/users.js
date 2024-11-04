const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a Mongoose model named User

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        if (!users || users.length === 0) {
            return res.status(404).json({ success: false, message: 'No users found' });
        }
        res.json(users); // Send the list of users as a JSON response
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send('An error occurred while retrieving users.');
    }
});

// Create a new user
router.post('/', async (req, res) => {
    const { email, password, first_name, last_name, phone, role } = req.body; // Destructure user data from the request body

    // Validate user data
    if (!email || !password || !first_name || !last_name || !role) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Set default role if not provided
    const userRole = role || 'user'; // Default to 'user' if no role is specified

    try {
        const newUser = new User({
            email,
            password,
            first_name,
            last_name,
            phone,
            role: userRole,
            created_at: new Date() // Set created_at to the current date
        });

        await newUser.save(); // Save the new user to the database
        res.status(201).json({ success: true, message: 'User created', newUser }); // Respond with the created user
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('An error occurred while creating the user.');
    }
});

module.exports = router;
