const { Schema, model, Types } = require('mongoose');

const auctionSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: [4, 'Name must be at least 4 characters long!']
    },
    description: {
        type: String,
        maxlength: [200, 'Description must be at least 200 characters long!']
    },
    category: {
        type: String,
        required: true,
        enum:['vehicles', 'estate', 'electronics', 'furniture', 'other'],
    },
    imgUrl: {
        type: String,
        match: [/^https?:\/\/.+$/i, 'Image URL must start with http:// or https://']
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be a positive number!']
    },

    bidder: {
        type: Types.ObjectId,
        ref: 'User',
    },
    author: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Auction = model('Auction', auctionSchema);

module.exports = Auction;