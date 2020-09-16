// Import Modules
require('dotenv').config()
const encryption = require('./encryption');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// Passport
module.exports = (passport) => {
    passport.use(new LocalStrategy({ 
        usernameField: 'email', 
        passwordField: 'password' 
    }, (email, password, done) => {
        User.findOne({ email }, (error, user) => {
            if (error) {
                return done(error);
            }

            if (!user) { 
                return done(null, false, { message: 'Incorrect email.' }); 
            }
            
            const isValid = encryption.validatePassword(password, user.hash, user.salt);
            
            if (!isValid) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (error, user) => {
            done(error, user);
        })
    });
}