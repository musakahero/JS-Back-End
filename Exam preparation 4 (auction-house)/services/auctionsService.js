const Auction = require("../models/Auction");
const User = require("../models/User");

async function getAll() {
    return Auction.find({}).lean();
};

async function getById(id) {
    return Auction.findById(id).lean();
};

async function create(auction) {
    return await Auction.create(auction);
};

//DELETE BY ID
// async function deleteById(auctionId) {
//     //remove auction from user purchases collection
//     const users = await User.find({ purchases: auctionId });
//     if (users.length > 0) {
//         users.map(async (u) => {
//             u.purchases.splice(u.purchases.indexOf(auctionId), 1);
//             await u.save();
//         });
//     };

//     //delete the auction
//     await Auction.findByIdAndDelete(auctionId);
// };


//UPDATE auction
// async function update(auction) {
//     const existing = await Auction.findById(auction._id);
//     existing.name = auction.name;
//     existing.imgUrl = auction.imgUrl;
//     existing.price = auction.price;
//     existing.description = auction.description;
//     existing.paymentMethod = auction.paymentMethod;
    
//     await existing.save();
// };


// //PURCHASE
// async function purchase(auctionId, userId) {
//     //add user to the auction's buyers list
//     const auction = await Auction.findById(auctionId);
//     auction.buyers.push(userId);
//     await auction.save();

//     //add oggrt to the user's purchases list
//     const user = await User.findById(userId);
//     user.purchases.push(auctionId);
//     await user.save();
// };

module.exports = {
    getAll,
    getById,
    create,
    // update,
    // deleteById,
    // purchase

}