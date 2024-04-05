const { create, getById, update, deleteById, purchase } = require('../services/offersService');
const { parseError } = require('../util/parser');

const offerController = require('express').Router();

//CREATE offer page
offerController.get('/create', async (req, res) => {

    res.render('create', {
        title: 'Create Crypto',
        offer: req.body
    });
});

//CREATE offer
offerController.post('/create', async (req, res) => {

    //setup default value for drop-down menu --v
    let isCryptoWallet = false;
    let isCreditCard = false;
    let isDebitCard = false;
    let isPayPal = false;

    req.body.paymentMethod == 'crypto-wallet' ? isCryptoWallet = true
        : req.body.paymentMethod == 'credit-card' ? isCreditCard = true
            : req.body.paymentMethod == 'debit-card' ? isDebitCard = true
                : req.body.paymentMethod == 'paypal' ? isPayPal = true
                    : false;
    //--^

    const offer = {
        name: req.body.name,
        imgUrl: req.body.imgUrl,
        price: Number(req.body.price),
        description: req.body.description,
        paymentMethod: req.body.paymentMethod,
        owner: req.user._id
    };

    try {
        //check for blanks
        if (Object.values(offer).some(v => !v)) {
            throw Error('All fields are required!');
        };

        await create(offer);

        res.redirect('/catalog');
    } catch (err) {


        res.render('create', {
            title: 'Create Crypto',
            offer,
            isCryptoWallet,
            isCreditCard,
            isDebitCard,
            isPayPal,
            errors: parseError(err)
        });
    };
});

//EDIT offer page
offerController.get('/:id/edit', async (req, res) => {

    const offer = await getById(req.params.id);

    //validate owner
    if (offer.owner != req.user._id) {
        return res.redirect('/auth/login');
    };


    //setup default value for drop-down menu --v
    let isCryptoWallet = false;
    let isCreditCard = false;
    let isDebitCard = false;
    let isPayPal = false;

    offer.paymentMethod == 'crypto-wallet' ? isCryptoWallet = true
        : offer.paymentMethod == 'credit-card' ? isCreditCard = true
            : offer.paymentMethod == 'debit-card' ? isDebitCard = true
                : offer.paymentMethod == 'paypal' ? isPayPal = true
                    : false;
    //--^


    res.render('edit', {
        title: 'Edit Crypto',
        isCryptoWallet,
        isCreditCard,
        isDebitCard,
        isPayPal,
        offer
    });
});

//EDIT offer
offerController.post('/:id/edit', async (req, res) => {

    const offer = {
        name: req.body.name,
        imgUrl: req.body.imgUrl,
        price: Number(req.body.price),
        description: req.body.description,
        paymentMethod: req.body.paymentMethod,
        _id: req.params.id
    };

    try {
        //check for blanks
        if (Object.values(offer).some(v => !v)) {
            throw Error('All fields are required!');
        };

        await update(offer);

        res.redirect(`/catalog/${offer._id}/details`);

    } catch (err) {
        res.render('edit', {
            title: 'Edit Crypto',
            offer,
            errors: parseError(err)
        });
    };
});

//DELETE offer
offerController.get('/:id/delete', async (req, res) => {
    const offer = await getById(req.params.id);

    //validate owner
    if (offer.owner != req.user._id) {
        return res.redirect('/auth/login');
    }
    offer.isOwner = true;

    try {
        await deleteById(req.params.id);

        res.redirect('/catalog');

    } catch (err) {
        res.render('details', {
            title: 'Crypto Details',
            offer,
            errors: parseError(err)
        })
    }
});


//BUY offer
offerController.get('/:id/buy', async (req, res) => {

    const offer = await getById(req.params.id);

    try {
        //validate owner
        if (offer.owner == req.user._id) {
            offer.isOwner = true;
            throw new Error('Cannot buy crypto that you already purchased!');
        };

        if (offer.buyers.map(u => u.toString()).includes(req.user._id.toString())) {
            offer.isPurchased = true;
            throw new Error('Cannot buy crypto twice!');
        };

        await purchase(req.params.id, req.user._id);

        res.redirect(`/catalog/${req.params.id}/details`);

    } catch (err) {
        res.render('details', {
            title: 'Crypto Details',
            offer,
            errors: parseError(err)
        });
    }

});
module.exports = offerController;