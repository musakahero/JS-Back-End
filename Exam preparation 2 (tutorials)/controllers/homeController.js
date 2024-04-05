const { getAll } = require('../services/courseService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    const courses = await getAll() || [];

    const sortedDescByEnrolls = courses.sort((a,b) => b.enrolledUsers.length-a.enrolledUsers.length).slice(0,3);
    const sortedAscByTime = courses.sort((a,b) => a.createdOn-b.createdOn);
    
    res.render('home', {
        title: 'Home Page',
        sortedDescByEnrolls,
        sortedAscByTime 
    });
});

module.exports = homeController;
