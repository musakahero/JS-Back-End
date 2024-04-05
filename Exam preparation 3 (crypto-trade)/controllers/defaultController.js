const defaultController = require('express').Router();

//TODO: Replace with real controller by assignment
defaultController.get('/', (req, res) => {
    res.render('404', {
        title: '404 Page Not Found',
        user: req.user
    });
});

module.exports = defaultController;
