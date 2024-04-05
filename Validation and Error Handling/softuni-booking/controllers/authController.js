const { login, register } = require('../services/authService');
const { body, validationResult } = require('express-validator');
const authController = require('express').Router();


authController.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login'
    });
});

authController.post('/login', async (req, res) => {
    try {
        const result = await login(req.body.username, req.body.password);
        attachToken(req, res, result);
        res.redirect('/');
    } catch (err) {
        res.render('login', {
            title: 'Login',
            error: err.message.split('\n')
        });
    }
});

authController.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register'
    });
});

authController.post('/register',
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required.').bail()
        .isAlphanumeric().withMessage('Username may contain only English letters and numbers'),
    body('password')
        .trim()
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('repass')
        .trim()
        .custom(async (value, { req }) => {
            if (value != req.body.password) {
                throw new Error('Passwords don\'t match')
            }
        }),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
           
            if (errors.length > 0) {
                throw errors;
            };

            const result = await register(req.body.username, req.body.password);
            attachToken(req, res, result);
            res.redirect('/');
        } catch (error) {
            const fields = Object.fromEntries(error.map( e=> [e.param, e.param]))
            res.render('register', {
                title: 'Register',
                error, 
                fields
            });
        }
    });

authController.get('/logout', (req, res) => {
    res.clearCookie('jwt');
    return res.redirect('/');
});

function attachToken(req, res, data) {
    const token = req.signJwt(data);
    res.cookie('jwt', token, { maxAge: 14400000 });
}


module.exports = authController;