const auctionController = require("../controllers/auctionController");
const authController = require("../controllers/authController");
const catalogController = require("../controllers/catalogController");
const defaultController = require("../controllers/defaultController");
const homeController = require("../controllers/homeController");
const { isGuest, hasUser } = require("../middlewares/guards");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', isGuest(), authController);
    app.use('/catalog', catalogController);
    app.use('/auction', hasUser(), auctionController);

    app.use('*', defaultController);
};