const Toy = require("../models/Toy");
const User = require("../models/User");

async function getAll() {
    return Toy.find({}).lean();
};

async function getById(id) {
    return Toy.findById(id).lean();
};

async function create(toy) {
    return await Toy.create(toy);
};

//DELETE BY ID
async function deleteById(toyId) {
    //remove toy from user purchases collection
    const users = await User.find({ purchasedToys: toyId });
    if (users.length > 0) {
        users.map(async (u) => {
            u.purchasedToys.splice(u.purchasedToys.indexOf(toyId), 1);
            await u.save();
        });
    };

    //delete the toy
    await Toy.findByIdAndDelete(toyId);
};


//UPDATE toy
async function update(toy) {
    const existing = await Toy.findById(toy._id);
    existing.title = toy.title;
    existing.price = toy.price;
    existing.description = toy.description;
    existing.category = toy.category;
    existing.charity = toy.charity;
    
    await existing.save();
};


// //PURCHASE
async function purchase(toyId, userId) {
    //add user to the toy's buyers list
    const toy = await Toy.findById(toyId);
    toy.buyers.push(userId);
    await toy.save();

    //add toy to the user's purchases list
    const user = await User.findById(userId);
    user.purchasedToys.push(toyId);
    await user.save();
};

module.exports = {
    getAll,
    getById,
    create,
    purchase,
    deleteById,
    update

}