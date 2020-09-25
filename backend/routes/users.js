const express = require('express');
const passport = require('passport')
require('../config/passport')(passport);
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const encryption = require('../config/encryption');
const isAuth = require('../middleware/authRoutes').isAuth;
const isAdmin = require('../middleware/authRoutes').isAdmin;
const User = require('../models/User');
const Product = require('../models/Product');

const router = express.Router();

router.post('/register', (req, res, next) => {
    User.findOne({ email: req.body.email }, (error, user) => {
        if (error) {
            console.log(error);
        }

        if (user) {
            res.json({ message: 'A user with this email already exists.', isRegistered: false })
        } else {
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
                    res.json({ message: 'You have been successfully registered.', isRegistered: true });
                }
            })
        }
    })
})

router.post('/sign-in', (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) { 
            return next(error); 
        }

        if (!user) { 
            return res.json({ message: 'Email or password is incorrect.', isSignedIn: false });
        }

        req.logIn(user, (error) => {
            if (error) { 
                return next(error); 
            }

            return res.json({ message: 'You have been successfully signed in.', isSignedIn: true });
        });
    })(req, res, next)
});

router.delete('/sign-out', isAuth, (req, res, next) => {
    req.logout();

    res.json({ message: 'You have been successfully signed out.', isAuth: false });
});

router.get('/user', isAuth, (req, res, next) => {
    res.json({ message: 'You have been successfully authenticated.', isAuth: true });
})

router.get('/admin', isAdmin, (req, res, next) => {
    res.json({ message: 'You have been successfully authenticated.', isAdmin: true });
})

router.get('/user/cart', isAuth, (req, res, next) => {
    User.findById(req.user.id).populate('cart.item').exec((error, user) => {
        if (error) {
            console.log(error);
        }

        res.json({ message: 'Retrieved cart.', cart: user.cart });
    })
})

router.put('/user/cart/add-item', isAuth, (req, res, next) => {
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
                res.json({ message: 'Item is already in cart.', isAdded: false, cart: user.cart });
            } else {
                user.cart.push({ item: product, quantity: 1 });
                user.save();
                res.json({ message: 'Added item to cart.', isAdded: true, cart: user.cart });
            }
        })
    })
})

router.put('/user/cart/remove-item', isAuth, (req, res, next) => {
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
                res.json({ message: 'Removed item from cart.', cart: user.cart });
            }
        })
    })
})

router.post('/user/cart/checkout-session', async (req, res, next) => {
    const cart = req.body.cart;
    let items = [];

    if (cart.type === 'guest') {
        cart.data.forEach(cartItem => {
            let item = {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: cartItem.title
                    },
                    unit_amount: cartItem.price * 100
                },
                quantity: cartItem.quantity,
            }
    
            items.push(item);
        })
    }

    if (cart.type === 'user') {
        let ids = cart.data.map(cartItem => {
            return cartItem.item;
        })

        let products = await Product.find({_id: {$in: ids}});

        products.forEach(product => {
            let item = {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.title
                    },
                    unit_amount: product.price * 100
                },
                quantity: 1
            }

            items.push(item);
        })
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: items,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
})

module.exports = router;