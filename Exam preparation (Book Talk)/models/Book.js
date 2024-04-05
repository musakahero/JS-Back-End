const { Schema, model, Types } = require('mongoose');

//TODO: Add User properties and validation according to assignment
const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: [2, 'Title must be at least 2 characters long!']
    },
    author: {
        type: String,
        required: true, 
        minlength: [5, 'Author must be at least 5 characters long!']
    },
    imgUrl: {
        type: String,
        required: true,
        match: [/^https?:\/\/.+$/i, 'Image URL must start with http:// or https://']
    },
    bookReview: {
        type: String,
        required: true,
        minlength: [10, 'Review must be at least 10 characters long!']
    },
    genre: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true,
        min: [1, 'Stars must be a positive number between 1 and 5'],
        max: [5, 'Stars must be a positive number between 1 and 5']
    },
    wishingList: {
        type: [Types.ObjectId],
        ref: 'User', 
        default: []
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Book = model('Book', bookSchema);

module.exports = Book;