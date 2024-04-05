const authController = require("../controllers/authController");
const catalogController = require("../controllers/catalogController");
const defaultController = require("../controllers/defaultController");
const homeController = require("../controllers/homeController");
const toyController = require("../controllers/toyController");
const { hasUser, isGuest } = require("../middlewares/guards");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', isGuest(), authController);
    app.use('/catalog', catalogController);
    app.use('/toys', hasUser(), toyController)
    
    app.use('*', defaultController)
};