// Imports & Variables
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// Import EJS Layouts
const expressLayouts = require('express-ejs-layouts');

// Port to run server on
const PORT = process.env.PORT || 9000

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// MIDDLEWARE
// Static file dir
app.use('/static', express.static(__dirname + '/public'));

// EJS templating
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
// Allows access to form data with req.body
app.use(express.urlencoded({ extended: false }));

// Express Session Middleware
app.use(session({
    secret: require('./config/keys').ExpressSessionSecret,
    resave: true,
    saveUninitialized: true
    // cookie: { secure: true }
}))

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash Middleware
app.use(flash());

// Global Variable Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// Server Run
app.listen(PORT, console.log(`Server started on port: ${PORT}`));