const express = require('express');
const { v4: uuidv4 } = require('uuid');
const upload = require('../config/multer');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Product = require('../models/product');

const router = express.Router();

router.get('/product-list', (req, res, next) => {
    Product.find({}, (error, products) => {
        if (error) {
            res.json({ message: 'Could not find products' });
        } else {
            res.send(products);
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
            res.json({ message: 'Successfully saved product.', title: req.body.title, category: req.body.category, description: req.body.description, price: req.body.price, files: req.files['files'] })
        }
    })
})

router.post('/checkout-session', async (req, res, next) => {
    const cart = req.body.cart;

    let items = [];
    
    let i = 0;
    while (i < cart.length) {
        let item = {
            price_data: {
                currency: "usd",
                product_data: {
                    name: cart[i].title
                },
                unit_amount: cart[i].price * 100
            },
            quantity: cart[i].quantity,
        }

        items.push(item);

        i++;
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