const { Schema, model, Types } = require('mongoose');

const courseSchema = new Schema({
    courseTitle: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, 'Title must be at least 4 characters long!'],
    },
    description: {
        type: String,
        required: true,
        minlength: [20, 'Description must be at least 20 characters long!'],
        maxlength: [50, 'Description must be a maximum of 50 characters long!']
    },
    imgUrl: { type: String, required: true, match:      [/^https?:\/\/.+$/i, 'Image URL must start with http:// or https://']},
    duration: { type: String, required: true },
    createdOn: { type: Date, required: true },
    enrolledUsers: { type: [Types.ObjectId], ref: 'User', default: []},
    owner: { type: Types.ObjectId, ref:'User'}
});

//DB Index (if needed)
courseSchema.index({ courseTitle: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Course = model('Course', courseSchema);

module.exports = Course;