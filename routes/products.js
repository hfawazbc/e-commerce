const express = require('express');
const upload = require('../config/multer');
const Product = require('../models/Product');

const router = express.Router();

router.get('/', (req, res, next) => {
    Product.find({}, (error, products) => {
        if (error) {
            console.log(error);
        } else {
            res.json({ message: 'Retrieved products.', products })
        }
    });
})

router.post('/', upload.fields([{ name: 'files' }]), (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        images: req.files['files'],
    })

    product.save((error, product) => {
        if (error) {
            return console.error.bind(error);
        } else {
            res.json({ message: 'Your product has been successfully posted.', product })
        }
    })
})

module.exports = router;