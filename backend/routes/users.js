const express = require('express');
const encryption = require('../config/encryption');
const passport = require('passport')
require('../config/passport')(passport);

const User = require('../models/user');

const router = express.Router();

router.get('/user', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.json({ message: 'Authenticated.', user: true });
        next();
    } else {
        res.json({ message: 'Forbidden.', user: false });
    }
})

router.post('/register', (req, res, next) => {
     const encryptedPassword = encryption.generatePassword(req.body.password);
    
     const salt = encryptedPassword.salt;
     const hash = encryptedPassword.hash;
 
     const user = new User({
         email: req.body.email,
         hash: hash,
         salt: salt
     });
 
     user.save((error, user) => {
        if (error) {
            return console.error.bind(error);
        } else {
            res.json({ message: 'Successfully registered user.', registered: true });
        }
    })
})

router.post('/sign-in', passport.authenticate('local'), (req, res, next) => {
    res.json({ message: 'Successfully signed in.', signedIn: true });
});

router.delete('/sign-out', (req, res, next) => {
    req.logout();
    res.clearCookie('connect.sid');
    req.session.destroy();

    res.json({ message: 'Successfully signed out.', signedOut: true });
});

router.post('/user/cart', (req, res, next) => {
    res.send('User cart.');
})

module.exports = router;