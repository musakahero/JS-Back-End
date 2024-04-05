const { getAll, getById } = require('../services/toysService');

const catalogController = require('express').Router();

//READ all toys
catalogController.get('/', async (req, res) => {
    const toys = await getAll();

    res.render('catalog', {
        title: 'Catalog',
        toys
    });
});

//READ one offer (details page)
catalogController.get('/:id/details', async (req, res) => {
    const toy = await getById(req.params.id);

    if (req.user) {
        //validate owner
        if (toy.owner == req.user._id) {
            toy.isOwner = true;
            //check if user has purchased that toy
        } else if (toy.buyers.map(u => u.toString()).includes(req.user._id.toString())) {
            toy.isPurchased = true;
        };
    }

    res.render('details', {
        title: 'Toy details',
        toy
    })
});

module.exports = catalogController;
