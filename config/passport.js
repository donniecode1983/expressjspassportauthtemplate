const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load the User model
const User = require('../models/User');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match User
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        // if there is no user return done
                        return done(null, false,
                            { message: require('./messages').register.alert_email_not_registered });
                    }
                    // Match Password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: require('./messages').auth.alert_password_incorrect });
                        }
                    });
                })
                .catch(err => console.log(err));
        })
    );

    // Passport Serializers
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) =>  {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}