require('dotenv').config()
const encryption = require('./encryption');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = (passport) => {
    passport.use(new LocalStrategy({ 
        usernameField: 'email', 
        passwordField: 'password' 
    }, (email, password, done) => {
        User.findOne({ email }, (error, user, info) => {
            if (error) {
                return done(error);
            }

            if (!user) { 
                return done(null, false); 
            }
            
            const isValid = encryption.validatePassword(password, user.hash, user.salt);
            
            if (!isValid) {
                return done(null, false);
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