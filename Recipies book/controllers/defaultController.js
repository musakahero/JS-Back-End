const defaultController = require('express').Router();

//TODO: Replace with real controller by assignment
defaultController.get('/', (req, res) => {
    res.render('home', {
        title: '404 Page not found',
    });
});

module.exports = defaultController;
