const { create, wishToRead, getById, update, deleteById } = require('../services/bookService');
const { parseError } = require('../util/parser');

const bookController = require('express').Router();

//CREATE book page
bookController.get('/create', async (req, res) => {

    res.render('create', {
        title: 'Create Book',
        book: req.body
    });
});

//CREATE book
bookController.post('/create', async (req, res) => {

    const book = {
        title: req.body.title,
        author: req.body.author,
        imgUrl: req.body.imgUrl,
        bookReview: req.body.bookReview,
        genre: req.body.genre,
        stars: req.body.stars,
        owner: req.user._id
    };

    try {
        //check for blanks
        if (Object.values(book).some(v => !v)) {
            throw Error('All fields are required!');
        };

        await create(book);

        res.redirect('/catalog');
    } catch (err) {


        res.render('create', {
            title: 'Create Book',
            book,
            errors: parseError(err)
        });
    };
});

//WISH book
bookController.get('/:id/wish', async (req, res) => {

    const book = await getById(req.params.id);

    try {
        //validate owner
        if (book.owner == req.user._id) {
            book.isOwner = true;
            throw new Error('Cannot add a book that you already reviewed to your wishlist!');
        };

        if (book.wishingList.map(u => u.toString()).includes(req.user._id.toString())) {
            book.isWished = true;
            throw new Error('Cannot add a book to your wishlist twice!');
        };

        await wishToRead(req.params.id, req.user._id);

        res.redirect(`/catalog/${req.params.id}/details`);

    } catch (err) {
        res.render('details', {
            title: 'Book details',
            book,
            errors: parseError(err)
        });
    }

});

//EDIT book page
bookController.get('/:id/edit', async (req, res) => {


    const book = await getById(req.params.id);

    //validate owner
    if (book.owner != req.user._id) {
        return res.redirect('/auth/login');
    };

    res.render('edit', {
        title: 'Edit Book',
        book
    });
});

//EDIT book
bookController.post('/:id/edit', async (req, res) => {

    const book = {
        title: req.body.title,
        author: req.body.author,
        imgUrl: req.body.imgUrl,
        bookReview: req.body.bookReview,
        genre: req.body.genre,
        stars: req.body.stars,
        _id: req.params.id
    };

    try {
        //check for blanks
        if (Object.values(book).some(v => !v)) {
            throw Error('All fields are required!');
        };

        await update(book);

        res.redirect(`/catalog/${book._id}/details`);

    } catch (err) {
        res.render('edit', {
            title: 'Edit Book',
            book,
            errors: parseError(err)
        });
    };
});

//DELETE book
bookController.get('/:id/delete', async (req, res) => {
    const book = await getById(req.params.id);

    //validate owner
    if (book.owner != req.user._id) {
        return res.redirect('/auth/login');
    }
    book.isOwner = true;

    try {
        await deleteById(req.params.id);

        res.redirect('/catalog');

    } catch (err) {
        res.render('details', {
            title: 'Book Details',
            book,
            errors: parseError(err)
        })
    }
});

module.exports = bookController;
