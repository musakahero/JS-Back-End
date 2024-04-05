const Book = require("../models/Book");
const User = require("../models/User");

async function getAll() {
    return Book.find({}).lean();
};

async function getById(id) {
    return Book.findById(id).lean();
};

async function create(book) {
    return await Book.create(book);
};

async function deleteById(bookId) {
    //remove book from user
    const users = await User.find({ wishedBooks: bookId });
    if (users.length > 0) {
        users.map(async (u) => {
            u.wishedBooks.splice(u.wishedBooks.indexOf(bookId), 1);
            await u.save();
        });
    };

    //delete the book
    await Book.findByIdAndDelete(bookId);
};



//get book by ID
async function getBookById(bookId) {
    return await Book.findOne({ _id: bookId }).lean();
};


async function update(book) {
    const existing = await Book.findById(book._id);
    existing.title = book.title;
    existing.author = book.author;
    existing.imgUrl = book.imgUrl;
    existing.bookReview = book.bookReview;
    existing.genre = book.genre;
    existing.stars = book.stars;

    await existing.save();
};


async function wishToRead(bookId, userId) {
    //add user to the book's wishing users list
    const book = await Book.findById(bookId);
    book.wishingList.push(userId);
    await book.save();

    //add book to the user's wishlist
    const user = await User.findById(userId);
    user.wishedBooks.push(bookId);
    await user.save();
};

module.exports = {
    getAll,
    getById,
    create,
    wishToRead,
    update,
    deleteById,
    getBookById
}