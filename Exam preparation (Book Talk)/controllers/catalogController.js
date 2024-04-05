const { getAll, getById } = require('../services/bookService');

const catalogController = require('express').Router();

//READ all books
catalogController.get('/', async (req, res) => {
    const books = await getAll();

    res.render('catalog', {
        title: 'Catalog',
        books
    });
});

//READ one book (details page)
catalogController.get('/:id/details', async (req, res) => {
    const book = await getById(req.params.id);

    if (req.user) {
        //validate owner
        if (book.owner == req.user._id) {
            book.isOwner = true;
            //check if user has wished that book
        } else if (book.wishingList.map(u => u.toString()).includes(req.user._id.toString())) {
            book.isWished = true;
        };
    }

    res.render('details', {
        title: 'Book Details',
        book
    })
});


module.exports = catalogController;
