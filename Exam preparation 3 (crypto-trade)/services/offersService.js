const Offer = require("../models/Offer");
const User = require("../models/User");

async function getAll() {
    return Offer.find({}).lean();
};

async function getById(id) {
    return Offer.findById(id).lean();
};

async function create(offer) {
    return await Offer.create(offer);
};

//DELETE BY ID
async function deleteById(offerId) {
    //remove offer from user purchases collection
    const users = await User.find({ purchases: offerId });
    if (users.length > 0) {
        users.map(async (u) => {
            u.purchases.splice(u.purchases.indexOf(offerId), 1);
            await u.save();
        });
    };

    //delete the offer
    await Offer.findByIdAndDelete(offerId);
};


//UPDATE offer
async function update(offer) {
    const existing = await Offer.findById(offer._id);
    existing.name = offer.name;
    existing.imgUrl = offer.imgUrl;
    existing.price = offer.price;
    existing.description = offer.description;
    existing.paymentMethod = offer.paymentMethod;
    
    await existing.save();
};


// //PURCHASE
async function purchase(offerId, userId) {
    //add user to the offer's buyers list
    const offer = await Offer.findById(offerId);
    offer.buyers.push(userId);
    await offer.save();

    //add oggrt to the user's purchases list
    const user = await User.findById(userId);
    user.purchases.push(offerId);
    await user.save();
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    purchase

}