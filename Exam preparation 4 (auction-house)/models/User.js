const { Schema, model,Types } = require('mongoose');

//TODO: Add User properties and validation according to assignment
const userSchema = new Schema({
    email:{type: String, required: true, unique: true, match: [/^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/, 'Invalid email format!']},
    firstName: { type: String, required: true,  minlength: [1, 'First name must be at least 1 character long!']},
    lastName: { type: String, required: true,  minlength: [1, 'Last name must be at least 1 character long!']},
    hashedPassword: { type: String, required: true },
    closedAuctions: {type:[Types.ObjectId], ref: 'Auction', default: [] }
});

//DB Index (if needed)
userSchema.index({ email: 1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});


const User = model('User', userSchema);

module.exports = User;