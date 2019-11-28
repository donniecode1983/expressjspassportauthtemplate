module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()) {
            return next()
        }
        req.flash('error_msg', require('./messages').auth.alert_not_logged_in);
        res.redirect('/users/login');
    }
}