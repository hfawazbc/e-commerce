const express = require('express');
const encryption = require('../config/encryption');
const passport = require('passport')
require('../config/passport')(passport);

const User = require('../models/user');
const Product = require('../models/product');

const router = express.Router();

router.get('/user', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.json({ message: 'Authenticated.', user: { authenticated: true } });
        next();
    } else {
        res.json({ message: 'Forbidden.', user: { authenticated: false } });
    }
})

router.get('/user/cart', (req, res, next) => {
    if (req.isAuthenticated()) {
        User.findById(req.user.id).populate('cart.item').exec((error, user) => {
            if (error) {
                console.log(error);
            }

            res.json({ message: 'Authenticated.', user: { authenticated: true, cart: user.cart } });
        })
    } else {
        res.json({ message: 'Forbidden.', user: { authenticated: false } });
    }
})

router.put('/user/cart/add-item', (req, res, next) => {
    if (req.isAuthenticated()) {
        Product.findById(req.body.itemId, (error, product) => {
            if (error) {
                console.log(error);
            }

            User.findById(req.user.id).populate('cart.item').exec((error, user) => {
                if (error) {
                    console.log(error)
                }

                let cart = user.cart.filter(cartItem => cartItem.item.equals(product._id));

                if (cart.length > 0) {
                    res.json({ message: 'Item is already in cart.', user: { cart: user.cart } });
                } else {
                    user.cart.push({ item: product, quantity: 1 });

                    user.save();
        
                    res.json({ message: 'Item added to cart.', user: { cart: user.cart } });
                }
            })
        })
    } else {
        res.json({ message: 'Forbidden.', user: { authenticated: false } });
    }
})

router.put('/user/cart/remove-item', (req, res, next) => {
    if (req.isAuthenticated()) {
        Product.findById(req.body.itemId, (error, product) => {
            if (error) {
                console.log(error);
            }

            User.findById(req.user.id).populate('cart.item').exec((error, user) => {
                if (error) {
                    console.log(error)
                }

                let cart = user.cart.filter(cartItem => cartItem.item.equals(product._id));

                if (cart.length > 0) {
                    user.cart.pull(cart[0]._id);

                    user.save();
    
                    res.json({ message: 'Removed item from cart.', user: { cart: user.cart } });
                }
            })
        })
    } else {
        res.json({ message: 'Forbidden.', user: { authenticated: false } });
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
            res.json({ message: 'Successfully registered user.', user: { registered: true } });
        }
    })
})

router.post('/sign-in', passport.authenticate('local'), (req, res, next) => {
    res.json({ message: 'Successfully signed in.', user: { authenticated: true } });
});

router.delete('/sign-out', (req, res, next) => {
    req.logout();

    res.json({ message: 'Successfully signed out.', user: { authenticated: false } });
});

module.exports = router;