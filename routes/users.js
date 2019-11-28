// Imports & Variables
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Require the User Model
const User = require('../models/User');

// Require bcrypt to encrypt user password
const bcrypt = require('bcryptjs');


// Routes
// Login Page
router.get('/login', (req, res) => {
    // res.send('Login')
    res.render('login');
});

// Register Page
router.get('/register', (req, res) => {
    // res.send('Register')
    res.render('register');
});

// Register POST
router.post('/register', (req, res) => {
    // read form data into const variables
    const { name, email, password, password2 } = req.body;

    // Validate Data
    let errors = [];

    // Check Required Fields
    if (!name || !email || !password || !password2) {
        errors.push({ message: 'Please fill in all fieds' });
    }

    //Check that passwords match
    if (password !== password2) {
        errors.push({ message: 'Passwords do not match' })
    }

    // Check Password Length
    if (password.length < 6) {
        errors.push({ message: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        // Validation Passes
        User.findOne({ email: email })
        .then(user => {
            if(user) {
                // User Exists
                errors.push({message: 'Email is already registered'});
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });
                // Hash Password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        // throw the error if there is one
                        if(err) throw err;
                        // set the password to the hash
                        newUser.password = hash;
                        // Save the new user
                        newUser.save()
                        .then(user => {
                            req.flash('success_msg', 'You are now registered');
                            res.redirect('/users/login');
                        })
                        .catch(err => console.log(err));

                    });
                });

                
            }
        })

    }
});

// User Profile Page
router.get('/', (req, res) => {
    res.send('User Profile Page')
});

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect:  '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true  
    } )(req, res, next)
});

// Logout Handle
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', require('../config/messages').auth.success_logout);
    res.redirect('/users/login');
});



// Export the Module
module.exports = router;