const authController = require("../controllers/authController");
const catalogController = require("../controllers/catalogController");
const defaultController = require("../controllers/defaultController");
const homeController = require("../controllers/homeController");
const offerController = require("../controllers/offerController");
const { hasUser } = require("../middlewares/guards");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/catalog', catalogController);
    app.use('/crypto', hasUser(), offerController);
    
    app.use('*', defaultController);


};