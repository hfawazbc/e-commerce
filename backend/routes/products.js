const express = require('express');
const upload = require('../config/multer');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../models/product');

const router = express.Router();

router.get('/', (req, res, next) => {
    Product.find({}, (error, products) => {
        if (error) {
            console.log(error);
        } else {
            res.json({ message: 'Found products.', products })
        }
    });
})

router.post('/', upload.fields([{ name: 'files' }]), (req, res, next) => {
    const product = new Product({
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        images: req.files['files'],
    })

    product.save((error, product) => {
        if (error) {
            return console.error.bind(error);
        } else {
            res.json({ message: 'Successfully saved product.', product })
        }
    })
})

router.post('/checkout-session', async (req, res, next) => {
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