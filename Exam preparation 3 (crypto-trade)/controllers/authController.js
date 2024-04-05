/* USE IF EMAIL VALIDATION IS REQUIRED, USES VALIDATOR LIB*/
const validator = require('validator');

const { register, login } = require('../services/userService');
const { parseError } = require('../util/parser');

const authController = require('express').Router();

authController.get('/register', (req, res) => {

//REGISTER
    res.render('register', {
        title: 'Register Page',
        //need req.body for {{#with body}} usage in the register.hbs
        body: req.body
    });
});

authController.post('/register', async (req, res) => {
    try {
        /* USE IF EMAIL VALIDATION IS REQUIRED, USES VALIDATOR LIB*/
        if (req.body.username == '' || req.body.password == '') {
            throw new Error('All fields are required!');
        };
        if (validator.isEmail(req.body.email) == false) {
            throw new Error('Invalid email');
        };
        if (req.body.password < 4) {
            throw new Error('Password must be at least 4 characters long!');
        };
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match!');
        };
        
        const token = await register(req.body.email, req.body.username, req.body.password);

        res.cookie('token', token);
        res.redirect('/'); 

    } catch (error) {
        const errors = parseError(error);

        res.render('register', {
            title: 'Register Page',
            errors,
            body: {
                username: req.body.username,
                email: req.body.email
            }
        });
    }
});


//LOGIN
authController.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login page',
        body: req.body
    });
});

authController.post('/login', async (req, res) => {

    try {
        if (req.body.email == '' || req.body.password == '') {
            throw new Error('All fields are required!');
        };

        const token = await login(req.body.email, req.body.password);

        res.cookie('token', token);
        res.redirect('/'); 

    } catch (error) {
        const errors = parseError(error);

        res.render('login', {
            title: 'Login page',
            errors,
            body: {
                username: req.body.username
            }
        });
    }
});

//LOGOUT
authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});
module.exports = authController;