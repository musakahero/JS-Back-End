const { Schema, model } = require('mongoose');

//TODO: Add User properties and validation according to assignment
const recipeSchema = new Schema({
    title: { type: String, required: true, unique: true, minlength: [3, 'Username must be at least 3 characters long!']},
    products: { type: String, required: true }
});

//DB Index (if needed)
recipeSchema.index({ title: 1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});


const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;