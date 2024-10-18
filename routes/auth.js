// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const axios = require('axios'); // Add axios for making HTTP requests




// Show registration form
router.get('/register', (req, res) => {
    res.render('register', {
        success_msg: req.flash('success_msg'),
        error_msg: req.flash('error_msg'),
    });
});

// Handle registration
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            req.flash('error_msg', 'Username or email already exists.');
            return res.redirect('/register');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        req.flash('success_msg', 'Registration successful! You can now log in.');
        res.redirect('/');
    } catch (error) {
        req.flash('error_msg', 'An error occurred during registration. Please try again.');
        res.redirect('/register');
    }
});





// Render login form
router.get('/', (req, res) => {
    res.render('/', {
        success_msg: req.flash('success_msg'),
        error_msg: req.flash('error_msg'),
    });
});

// Handle login logic
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }); // Find user by email
        if (!user) {
            req.flash('error_msg', 'Invalid email or password.');
            return res.redirect('/');
        }

        const isMatch = await bcrypt.compare(password, user.password); // Check password
        if (!isMatch) {
            req.flash('error_msg', 'Invalid email or password.');
            return res.redirect('/');
        }

        // Store user information in session
        req.session.userId = user._id; // Store user ID
        req.session.username = user.username; // Store username
        req.session.email = user.email; // Store email in session


        res.redirect('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
        req.flash('error_msg', 'An error occurred during login. Please try again.');
        res.redirect('/');
    }
});


// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/dashboard'); // If there's an error, redirect to dashboard
        }
        res.redirect('/login'); // Redirect to login after successful logout
    });
});








// Handle payment verification
router.post('/verify-payment', async (req, res) => {
    const { reference } = req.body;

    try {
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `sk_live_b8a7aaf869c1b0342d0c0863f0651301aea29f76` // Replace with your Paystack secret key
            }
        });

        if (response.data.data.status === 'success') {
            const amountPaid = response.data.data.amount / 100; // Convert from kobo to Naira
            // Update user balance
            const user = await User.findById(req.session.userId);
            user.balance = (user.balance || 0) + amountPaid;
            await user.save();

            res.json({ status: 'success', newBalance: user.balance });
        } else {
            res.json({ status: 'failure' });
        }
    } catch (error) {
        res.json({ status: 'failure' });
    }
});



// Export the router
module.exports = router;
