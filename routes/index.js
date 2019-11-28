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
        name: req.user.name
    });
});



// Export the Module
module.exports = router;