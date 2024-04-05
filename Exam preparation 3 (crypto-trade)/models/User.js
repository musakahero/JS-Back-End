const { Schema, model, Types } = require('mongoose');

//TODO: Add User properties and validation according to assignment
const userSchema = new Schema({
    email:{type: String, required: true, unique: true, minlength: [10, 'Email must be at least 10 characters long!']},
    username: { type: String, required: true, unique: true, minlength: [5, 'Username must be at least 5 characters long!']},
    hashedPassword: { type: String, required: true },
    purchases: {type: [Types.ObjectId], ref: 'Offer', default: []}
});

//DB Index (if needed)
userSchema.index({ email: 1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});
userSchema.index({ username: 1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});


const User = model('User', userSchema);

module.exports = User;