const { Schema, model, Types } = require('mongoose');

const offerSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, 'Name must be at least 2 characters long!']
    },
    imgUrl: {
        type: String,
        required: true,
        match: [/^https?:\/\/.+$/i, 'Image URL must start with http:// or https://']
    },
    price: {
        type: Number,
        required: true, 
        min: [0, 'Price must be a positive number!']
    },
    description: {
        type: String,
        required: true,
        minlength: [10, 'Description must be at least 10 characters long!']
    },
    paymentMethod: {
        type: String,
        enum:['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
        required: true
    },
    buyers: {
        type: [Types.ObjectId],
        ref: 'User', 
        default: []
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Offer = model('Offer', offerSchema);

module.exports = Offer;