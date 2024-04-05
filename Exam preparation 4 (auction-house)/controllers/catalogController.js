const { getAll, getById } = require('../services/auctionsService');

const catalogController = require('express').Router();

//READ all auctions
catalogController.get('/', async (req, res) => {
    const auctions = await getAll();
    
    res.render('catalog', {
        title: 'Browse auctions',
        auctions
    });
});

// READ one auction (details page)
catalogController.get('/:id/details', async (req, res) => {
    const auction = await getById(req.params.id);

    if (req.user) {
        //validate owner
        if (auction.author == req.user._id) {
            console.log(req.user._id);
            auction.isAuthor = true;
            //check if user has purchased has bid
        }
        // } else if (auction.buyers.map(u => u.toString()).includes(req.user._id.toString())) {
        //     auction.isPurchased = true;
        // };
    }

    res.render('details', {
        title: 'Auction Details',
        auction
    })
});

module.exports = catalogController;
