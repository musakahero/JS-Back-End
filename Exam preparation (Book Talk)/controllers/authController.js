/* USE IF EMAIL VALIDATION IS REQUIRED, USES VALIDATOR LIB*/
const validator = require('validator');

const { register, login } = require('../services/userService');
const { parseError } = require('../util/parser');

const authController = require('express').Router();

authController.get('/register', (req, res) => {

    res.render('register', {
        title: 'Register Page',
        //need req.body for {{#with body}} usage in the register.hbs
        body: req.body
    });
});

authController.post('/register', async (req, res) => {
    try {
        /* USE IF EMAIL VALIDATION IS REQUIRED, USES VALIDATOR LIB*/
        if (validator.isEmail(req.body.email) == false) {
            throw new Error('Invalid email!');
        }
        
        if (req.body.username == '' || req.body.password == '') {
            throw new Error('All fields are required!');
        }

        if(req.body.password.length < 3){
            throw new Error('Password must be at least 3 characters long!');
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match!');
        }
        const token = await register(req.body.email, req.body.username, req.body.password);


        res.cookie('token', token);
        res.redirect('/'); 

    } catch (err) {

        res.render('register', {
            title: 'Register Page',
            errors: parseError(err),
            body: {
                email: req.body.email,
                username: req.body.username
            }
        });
    }
});

authController.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login page'
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

    } catch (err) {

        res.render('login', {
            title: 'Login page',
            errors: parseError(err),
            body: {
                username: req.body.email
            }
        });
    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})
module.exports = authController;