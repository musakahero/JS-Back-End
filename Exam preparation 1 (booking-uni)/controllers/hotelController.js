const { create, getById, update, deleteById, bookRoom } = require('../services/hotelService');
const { parseError } = require('../util/parser');

const hotelController = require('express').Router();

//READ 1 HOTEL (DETAILS PAGE)
hotelController.get('/:id/details', async (req, res) => {

    const hotel = await getById(req.params.id);

    //validate owner (guard)
    if (hotel.owner == req.user._id) {
        hotel.isOwner = true;
        //check if user has booked a room in that hotel
    } else if(hotel.bookings.map(b => b.toString()).includes(req.user._id.toString())) {
        hotel.isBooked = true;
    }

    res.render('details', {
        title: 'Hotel Details',
        hotel
    });
});

//GET CREATE HOTEL PAGE
hotelController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Hotel',
        hotel: req.body
    });
});

//CREATE HOTEL
hotelController.post('/create', async (req, res) => {
    const hotel = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: Number(req.body.rooms),
        owner: req.user._id
    };

    try {
        //check for blank values before reaching the Model validation
        if (Object.values(hotel).some(v => !v)) {
            throw new Error('All fields are required!');
        };

        await create(hotel);
        res.redirect('/');
    } catch (err) {
        res.render('create', {
            title: 'Create Hotel',
            hotel,
            errors: parseError(err)
        });
    }

});

//GET EDIT 1 HOTEL PAGE
hotelController.get('/:id/edit', async (req, res) => {

    const hotel = await getById(req.params.id);

    //validate owner
    if (hotel.owner != req.user._id) {
        return res.redirect('/auth/login');
    }

    res.render('edit', {
        title: 'Edit Hotel',
        hotel
    });
});

//EDIT 1 HOTEL
hotelController.post('/:id/edit', async (req, res) => {
    const hotel = await getById(req.params.id);

    //validate owner (guard)
    if (hotel.owner != req.user._id) {
        return res.redirect('/auth/login');
    };

    const edited = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: Number(req.body.rooms),
        _id: req.params.id
    };

    try {
        //check for blank values before reaching the Model validation
        if (Object.values(edited).some(v => !v)) {
            throw new Error('All fields are required!');
        };

        await update(edited);
        res.redirect(`/hotel/${edited._id}/details`);

    } catch (err) {
        res.render('edit', {
            title: 'Edit Hotel',
            hotel: edited,
            errors: parseError(err)
        });
    }
});

//DELETE 1 HOTEL
hotelController.get('/:id/delete', async (req, res) => {

    const hotel = await getById(req.params.id);

    //validate owner
    if (hotel.owner != req.user._id) {
        return res.redirect('/auth/login');
    }

    await deleteById(req.params.id);
    res.redirect('/')
});

//BOOK ROOM IN 1 HOTEL
hotelController.get('/:id/book', async (req, res) => {

    const hotel = await getById(req.params.id);
    
    try {
        //validate owner
        if (hotel.owner == req.user._id) {
            hotel.isOwner = true;
            throw new Error('Cannot book your own hotel!');
        };

        if (hotel.bookings.map(b => b.toString()).includes(req.user._id.toString())) {
            hotel.isBooked = true;
            throw new Error('Cannot book twice');
        };

        await bookRoom(req.params.id, req.user._id);

        res.redirect(`/hotel/${req.params.id}/details`);

    } catch (err) {
        res.render('details', {
            title: 'Hotel Details',
            hotel,
            errors: parseError(err)
        })
    }
});

module.exports = hotelController;