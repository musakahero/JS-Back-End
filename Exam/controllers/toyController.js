const { create, getById, purchase, deleteById, update, getAll } = require('../services/toysService');
const { parseError } = require('../util/parser');

const toyController = require('express').Router();

//SEARCH toy page
toyController.get('/search', async (req, res) => {

    const searchTitle = req.query.searchTitle || '';
    const searchCharity = req.query.searchCharity || '';

    const result = await getAll();
    console.log('result: ',result);
    const filtered = result
    .filter(t => t.title.toLowerCase().includes(searchTitle.toLowerCase()))
    .filter(t => t.charity.toLowerCase().includes(searchCharity.toLowerCase()));
    console.log('filtered: ',filtered);
    res.render('search', {
        title: 'Search for a toy',
        searchTitle,
        searchCharity,
        filtered
    });
});



//CREATE toy page
toyController.get('/create', async (req, res) => {

    res.render('create', {
        title: 'Create a Toy',
        toy: req.body
    });
});

//CREATE toy
toyController.post('/create', async (req, res) => {

    const toy = {
        title: req.body.title,
        charity: req.body.charity,
        imgUrl: req.body.imgUrl,
        description: req.body.description,
        category: req.body.category,
        price: Number(req.body.price),
        owner: req.user._id
    };

    try {
        //check for blanks
        if (Object.values(toy).some(v => !v)) {
            throw Error('All fields are required!');
        };

        await create(toy);

        res.redirect('/catalog');
    } catch (err) {


        res.render('create', {
            title: 'Create a Toy',
            toy,
            errors: parseError(err)
        });
    };
});

//EDIT toy page
toyController.get('/:id/edit', async (req, res) => {

    const toy = await getById(req.params.id);

    //validate owner
        if (toy.owner != req.user._id) {
            return res.redirect('/auth/login');
        };

    res.render('edit', {
        title: 'Edit toy',
        toy
    });
});

//EDIT toy
toyController.post('/:id/edit', async (req, res) => {

    const toy = {
        title: req.body.title,
        price: Number(req.body.price),
        description: req.body.description,
        category: req.body.category,
        charity: req.body.charity,
        _id: req.params.id
    };


    try {
        //check for blanks
        if (Object.values(toy).some(v => !v)) {
            throw Error('All fields are required!');
        };

        await update(toy);

        res.redirect(`/catalog/${toy._id}/details`);

    } catch (err) {
        res.render('edit', {
            title: 'Edit Toy',
            toy,
            errors: parseError(err)
        });
    };
});

//DELETE toy
toyController.get('/:id/delete', async (req, res) => {
    const toy = await getById(req.params.id);

    //validate owner
    if (toy.owner != req.user._id) {
        return res.redirect('/auth/login');
    }
    toy.isOwner = true;

    try {
        await deleteById(req.params.id);

        res.redirect('/catalog');

    } catch (err) {
        res.render('details', {
            title: 'Toy details',
            toy,
            errors: parseError(err)
        });
    }
});


//BUY toy
toyController.get('/:id/buy', async (req, res) => {

    const toy = await getById(req.params.id);

    try {
        //validate owner
        if (toy.owner == req.user._id) {
            toy.isOwner = true;
            throw new Error('Cannot buy toy that you already purchased!');
        };

        if (toy.buyers.map(u => u.toString()).includes(req.user._id.toString())) {
            toy.isPurchased = true;
            throw new Error('Cannot buy toy twice!');
        };

        await purchase(req.params.id, req.user._id);

        res.redirect(`/catalog/${req.params.id}/details`);

    } catch (err) {
        res.render('details', {
            title: 'Toy Details',
            toy,
            errors: parseError(err)
        });
    }

});


module.exports = toyController;