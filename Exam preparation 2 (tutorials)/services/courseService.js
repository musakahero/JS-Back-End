const { Types } = require('mongoose');
const Course = require("../models/Course");
const User = require("../models/User");

async function create(course) {
    return await Course.create(course);
};

async function getAll() {
    return Course.find({}).lean();
};

async function getById(id) {
    return Course.findById(id).lean();
};

async function deleteById(courseId) {
    //remove course from user
    const users = await User.find({ enrolledCourses: courseId });
    if (users.length > 0) {
        users.map(async (u) => {
            u.enrolledCourses.splice(u.enrolledCourses.indexOf(courseId), 1);
            await u.save();
        });
    };

    //delete course
    await Course.findByIdAndDelete(courseId);
};

// async function getByUserBooking(userId) {
//     return Course.find({ enrolls: userId }).lean();
// };


async function update(course) {
    const existing = await Course.findById(course._id);
    existing.courseTitle = course.courseTitle;
    existing.description = course.description;
    existing.imgUrl = course.imgUrl;
    existing.duration = course.duration;

    await existing.save();
};


async function enrollCourse(courseId, userId) {
    //add user to the course's enrolled users list
    const course = await Course.findById(courseId);
    course.enrolledUsers.push(userId);
    await course.save();

    //add course to the user's enrolled courses list
    const user = await User.findById(userId);
    user.enrolledCourses.push(courseId);
    await user.save();
};

module.exports = {
    getAll,
    getById,
    create,
    enrollCourse,
    deleteById,
    update
}
