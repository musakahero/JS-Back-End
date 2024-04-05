const { getUserData } = require('../services/userService');
const { getBookById } = require('../services/bookService');

const homeController = require('express').Router();

//TODO: Replace with real controller by assignment
homeController.get('/', (req, res) => {
    res.render('home', {
        title: 'Home Page',
        user: req.user
    });
});

homeController.get('/:id/profile', async (req, res) => {

    //validate user
    
    if(!req.user || req.user._id != req.params.id ){
        return res.redirect('/auth/login');
    };


    const userData = await getUserData(req.user.email);

    //OPTION1
    // const wished = userData.wishedBooks.map(b => b.toString());
    // const result = [];

    // for (const id of wished) {
    //     const bookObj = await getBookById(id);
    //     result.push(bookObj);
    // };

///////////////////////////////////////////
    
   
    const wished = userData.wishedBooks.map(b => b.toString());
    const result = await Promise.all(wished.map(b => getBookById(b)));

    res.render('profile', {
        title: 'Profile Page',
        user: {
            email: userData.email,
            wishedBooks: result
        },
        result
    });
});


module.exports = homeController;
