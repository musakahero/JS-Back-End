/* USE IF EMAIL VALIDATION IS REQUIRED, USES VALIDATOR LIB
const validator = require('validator');
*/
const { register, login } = require('../services/userService');
const { parseError } = require('../util/parser');

const authController = require('express').Router();

authController.get('/register', (req, res) => {
    //TODO: Replace with actual view by assignment

    res.render('register', {
        title: 'Register Page',
        //need req.body for {{#with body}} usage in the register.hbs
        body: req.body
    });
});

authController.post('/register', async (req, res) => {
    try {
        /* USE IF EMAIL VALIDATION IS REQUIRED, USES VALIDATOR LIB
        if (validator.isEmail(req.body.email) == false) {
            throw new Error('Invalid email');
        }
        */
        if (req.body.username == '' || req.body.password == '') {
            throw new Error('All fields are required!');
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match!');
        }
        const token = await register(req.body.username, req.body.password);

        //TODO: check assignment to see if register creates session

        res.cookie('token', token);
        res.redirect('/'); //TODO: Replace with redirect from assignment

    } catch (error) {
        const errors = parseError(error);

        //TODO: Add error display to actual template from assignment

        res.render('register', {
            title: 'Register Page',
            errors,
            body: {
                username: req.body.username
            }
        });
    }
});

authController.get('/login', (req, res) => {
    //TODO: Replace with actual view by assignment
    res.render('login', {
        title: 'Login page'
    });
});

authController.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.username, req.body.password);

        res.cookie('token', token);
        res.redirect('/'); //TODO: Replace with redirect from assignment

    } catch (error) {
        const errors = parseError(error);

        //TODO: Add error display to actual template from assignment
        res.render('login', {
            title: 'Login page',
            errors,
            body: {
                username: req.body.username
            }
        });
    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})
module.exports = authController;