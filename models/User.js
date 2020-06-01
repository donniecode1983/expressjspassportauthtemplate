 const mongoose = require('mongoose');

 const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    last_name: {
        type: String
    }
 });

 const User = mongoose.model('User', userSchema);
 module.exports = User;