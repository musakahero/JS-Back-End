const { getAll, getById } = require('../services/accomodationService');

const router = require('express').Router();

router.get('/', (req, res) => {
    const search = req.query.search || '';
    const city = req.query.city || '';
    const fromPrice = Number(req.query.fromPrice) || 1;
    const toPrice = Number(req.query.toPrice) || 1000;
    
    const rooms = getAll(search, city, fromPrice, toPrice);

    res.render('catalog', {
        title: 'All Accomodation',
        rooms,
        search: search,
        city,
        fromPrice,
        toPrice
    });
});

router.get('/:id', (req, res) => {
    const roomId = req.params.id;
    const room = getById(roomId);

    if (room) {
        res.render('details', {
            title: 'Accomodation details',
            room
        });
    } else {
        res.render('roomNotFound', {
            title: 'Accomodation details',
            roomId
        });
    }
});

module.exports = router;