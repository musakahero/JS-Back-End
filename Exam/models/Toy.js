const { Schema, model, Types } = require('mongoose');

const toySchema = new Schema({
    title: { type: String, required: true, minlength: [10, 'Title must be at least 10 characters long!'] },
    charity: { type: String, required: true, minlength: [2, 'Charity must be at least 2 characters long!'] },
    imgUrl: { type: String, required: true, match: [/^https?:\/\/.+$/i, 'Image URL must start with http:// or https://'] },
    description: { type: String, required: true, minlength: [10, 'Description must be at least 10 characters long!'], maxlength: [100, 'Description must be a maximum of 100 characters long!'] },
    category: { type: String, required: true, minlength: [5, 'Category must be at least 5 characters long!'] },
    price: { type: Number, required: true, min: [0, 'Price must be a positive number!'] },
    buyers: { type: [Types.ObjectId], ref: 'User', default: [] },
    owner: { type: Types.ObjectId, ref: 'User' },
});

const Toy = model('Toy', toySchema);

module.exports = Toy;