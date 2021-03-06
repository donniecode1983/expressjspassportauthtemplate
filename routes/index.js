// Imports & Variables
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Routes

// Welcome Page
router.get('/', (req, res) => {
    // res.send('Welcome to the world!')
    res.render('welcome');
});

// Dashboard Page
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    // res.send('Welcome to the world!')
    res.render('dashboard', {
        name: req.user.name,
        email: req.user.email
    });
});

// Test Page
router.get('/test',  (req, res) => {
    // res.send('Welcome to the world!')
    res.render('test');
});



// Export the Module
module.exports = router;