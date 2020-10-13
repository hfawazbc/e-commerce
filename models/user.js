const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    cart: {
        type: [{
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: Number
        }]
    },
    purchased: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;