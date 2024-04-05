const defaultController = require('express').Router();

defaultController.get('/*', (req, res) => {
    res.render('notFound', {
        title: '404 Not Found',
        user: req.user
    });
});

module.exports = defaultController;
