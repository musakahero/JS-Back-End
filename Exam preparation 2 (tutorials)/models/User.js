const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, 
        required: true, 
        unique: true, 
        minlength: [5, 'Username must be at least 5 characters long!'],
        match: [/^[a-zA-Z0-9]+$/i, 'Username may contain only English letters and numbers']
    },
    hashedPassword: { type: String, required: true },
    enrolledCourses: { type: [Types.ObjectId], ref: 'Course', default: []}
});

//DB Index (if needed)
userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;