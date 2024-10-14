const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const authRoutes = require('./routes/auth');
const path = require('path');
require('dotenv').config();

const app = express();

// Connect to MongoDB without deprecated options
mongoose.connect(process.env.MONGO_URI, {})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
    secret: 'yourSecretKey', // Replace with your own secret
    resave: false,
    saveUninitialized: true
}));

// Flash middleware
app.use(flash());

// Make flash messages available in all views
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Define home route
app.get('/', (req, res) => {
    res.render('home'); // Create a home.ejs file in the views directory
});

// Define dashboard route
app.get('/dashboard', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login'); // Redirect to login if not authenticated
    }

    const username = req.session.username; // Retrieve the username from the session
    const email = req.session.email; // Retrieve the email from the session
    res.render('dashboard', { username, email }); // Pass both username and email to the view
});

// Routes
app.use('/', authRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
