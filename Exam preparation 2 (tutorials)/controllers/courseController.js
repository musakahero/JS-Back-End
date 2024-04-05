const courseController = require('express').Router();
const { getById, create, enrollCourse, deleteById, update } = require('../services/courseService');
const { parseError } = require('../util/parser');

//CREATE course page (get)
courseController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Course',
        course: req.body
    });
});

//CREATE course (post)
courseController.post('/create', async (req, res) => {
    const course = {
        courseTitle: req.body.courseTitle,
        description: req.body.description,
        imgUrl: req.body.imgUrl,
        duration: req.body.duration,
        createdOn: new Date(),
        owner: req.user._id
    };

    try {
        //check for blank values before reaching the Model validation
        if (Object.values(course).some(v => !v)) {
            throw new Error('All fields are required!');
        };

        await create(course);
        res.redirect('/');
    } catch (err) {
        res.render('create', {
            title: 'Create Course',
            course,
            errors: parseError(err)
        });
    }

});

//READ course (get details page)
courseController.get('/:id/details', async (req, res) => {

    const course = await getById(req.params.id);

    //validate owner
    if (course.owner == req.user._id) {
        course.isOwner = true;

        //check if user has enrolled in that course
    } else if (course.enrolledUsers.map(u => u.toString()).includes(req.user._id.toString())) {
        course.isEnrolled = true;
    };

    res.render('details', {
        title: 'Course Details',
        course
    });

});

//ENROLL course
courseController.get('/:id/enroll', async (req, res) => {

    const course = await getById(req.params.id);

    try {
        //validate owner
        if (course.owner == req.user._id) {
            course.isOwner = true;
            throw new Error('Cannot enroll your own course!');
        };

        if (course.enrolledUsers.map(u => u.toString()).includes(req.user._id.toString())) {
            course.isEnrolled = true;
            throw new Error('Cannot enroll twice');
        };

        await enrollCourse(req.params.id, req.user._id);

        res.redirect(`/course/${req.params.id}/details`);

    } catch (err) {
        res.render('details', {
            title: 'Course Details',
            course,
            errors: parseError(err)
        })
    }
});

//EDIT course page (get)
courseController.get('/:id/edit', async (req, res) => {
    const course = await getById(req.params.id);
    course._id = req.params.id;
    //validate owner
    if (course.owner != req.user._id) {
        return res.redirect('/auth/login');
    }

    res.render('edit', {
        title: 'Edit Course',
        course
    });
});

//EDIT course (post)
courseController.post('/:id/edit', async (req, res) => {
    const oldCourse = await getById(req.params.id);

    //validate owner
    if (oldCourse.owner != req.user._id) {
        return res.redirect('/auth/login');
    };

    const course = {
        courseTitle: req.body.courseTitle,
        description: req.body.description,
        imgUrl: req.body.imgUrl,
        duration: req.body.duration,
        _id: req.params.id
    };

    try {
        //check for blanks before reaching model
        if(Object.values(course).some(v => !v)){
            throw new Error('All fields are required!');
        };

        await update(course);

        res.redirect(`/course/${course._id}/details`);

    } catch (err) {
        res.render('edit', {
            title: 'Edit Course',
            course,
            errors: parseError(err)
        });
    }
});

//DELETE course
courseController.get('/:id/delete', async (req, res) => {

    const course = await getById(req.params.id);

    try {
        //validate owner
        if (course.owner != req.user._id) {
            return res.redirect('/auth/login');
        } else {
            course.isOwner = true;
        };

        await deleteById(req.params.id);

        res.redirect(`/`);

    } catch (err) {
        res.render('details', {
            title: 'Course Details',
            course,
            errors: parseError(err)
        })
    }
});


module.exports = courseController;