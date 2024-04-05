const { getAll, getById } = require('../services/offersService');

const catalogController = require('express').Router();

//READ all offers
catalogController.get('/', async (req, res) => {
    const offers = await getAll();

    res.render('catalog', {
        title: 'Catalog',
        offers
    });
});

//READ one offer (details page)
catalogController.get('/:id/details', async (req, res) => {
    const offer = await getById(req.params.id);

    if (req.user) {
        //validate owner
        if (offer.owner == req.user._id) {
            offer.isOwner = true;
            //check if user has purchased that crypto
        } else if (offer.buyers.map(u => u.toString()).includes(req.user._id.toString())) {
            offer.isPurchased = true;
        };
    }

    res.render('details', {
        title: 'Crypto Details',
        offer
    })
});

module.exports = catalogController;
