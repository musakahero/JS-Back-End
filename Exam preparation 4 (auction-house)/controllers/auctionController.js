const { create } = require('../services/auctionsService');
const { parseError } = require('../util/parser');

const auctionController = require('express').Router();

//CREATE auction page
auctionController.get('/create', async (req, res) => {

    res.render('create', {
        title: 'Create auction',
        auction: req.body
    });
});

//CREATE auction
auctionController.post('/create', async (req, res) => {

    const auction = {
        title: req.body.title,
        category: req.body.category,
        price: Number(req.body.price),
        author: req.user._id
    };

    //setup default value for drop-down menu --v
    let isVehicles = false;
    let isRealEstate = false;
    let isElectronics = false;
    let isFurniture = false;
    let isOther = false;

    req.body.category == 'vehicles' ? isVehicles = true
        : req.body.category == 'estate' ? isRealEstate = true
            : req.body.category == 'electronics' ? isElectronics = true
                : req.body.category == 'furniture' ? isFurniture = true
                    : req.body.category == 'other' ? isOther = true
                        : false;
    //--^


    auction.isVehicles = isVehicles;
    auction.isElectronics = isElectronics;
    auction.isRealEstate = isRealEstate;
    auction.isFurniture = isFurniture;
    auction.isOther = isOther;

    try {
        //check for blanks
        if (Object.values(auction).some(v => String(v).length == 0)) {
            throw Error('Title, Category and Price are required!');
        };
        auction.imgUrl = req.body.imgUrl;
        auction.description = req.body.description;
        



        await create(auction);

        res.redirect('/catalog');
    } catch (err) {

        res.render('create', {
            title: 'Create Auction',
            auction,
            errors: parseError(err)
        });
    };
});

// //EDIT auction page
// auctionController.get('/:id/edit', async (req, res) => {

//     const offer = await getById(req.params.id);

//     //validate owner
//     if (offer.owner != req.user._id) {
//         return res.redirect('/auth/login');
//     };


//     //setup default value for drop-down menu --v
//     let isCryptoWallet = false;
//     let isCreditCard = false;
//     let isDebitCard = false;
//     let isPayPal = false;

//     offer.paymentMethod == 'crypto-wallet' ? isCryptoWallet = true
//         : offer.paymentMethod == 'credit-card' ? isCreditCard = true
//             : offer.paymentMethod == 'debit-card' ? isDebitCard = true
//                 : offer.paymentMethod == 'paypal' ? isPayPal = true
//                     : false;
//     //--^


//     res.render('edit', {
//         title: 'Edit Crypto',
//         isCryptoWallet,
//         isCreditCard,
//         isDebitCard,
//         isPayPal,
//         offer
//     });
// });

// //EDIT auction
// auctionController.post('/:id/edit', async (req, res) => {

//     const offer = {
//         name: req.body.name,
//         imgUrl: req.body.imgUrl,
//         price: Number(req.body.price),
//         description: req.body.description,
//         paymentMethod: req.body.paymentMethod,
//         _id: req.params.id
//     };

//     try {
//         //check for blanks
//         if (Object.values(offer).some(v => !v)) {
//             throw Error('All fields are required!');
//         };

//         await update(offer);

//         res.redirect(`/catalog/${offer._id}/details`);

//     } catch (err) {
//         res.render('edit', {
//             title: 'Edit Crypto',
//             offer,
//             errors: parseError(err)
//         });
//     };
// });

// //DELETE auction
// auctionController.get('/:id/delete', async (req, res) => {
//     const offer = await getById(req.params.id);

//     //validate owner
//     if (offer.owner != req.user._id) {
//         return res.redirect('/auth/login');
//     }
//     offer.isOwner = true;

//     try {
//         await deleteById(req.params.id);

//         res.redirect('/catalog');

//     } catch (err) {
//         res.render('details', {
//             title: 'Crypto Details',
//             offer,
//             errors: parseError(err)
//         })
//     }
// });


// //BUY auction
// auctionController.get('/:id/buy', async (req, res) => {

//     const offer = await getById(req.params.id);

//     try {
//         //validate owner
//         if (offer.owner == req.user._id) {
//             offer.isOwner = true;
//             throw new Error('Cannot buy crypto that you already purchased!');
//         };

//         if (offer.buyers.map(u => u.toString()).includes(req.user._id.toString())) {
//             offer.isPurchased = true;
//             throw new Error('Cannot buy crypto twice!');
//         };

//         await purchase(req.params.id, req.user._id);

//         res.redirect(`/catalog/${req.params.id}/details`);

//     } catch (err) {
//         res.render('details', {
//             title: 'Crypto Details',
//             offer,
//             errors: parseError(err)
//         });
//     }

// });
module.exports = auctionController;