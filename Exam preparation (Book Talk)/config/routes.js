const authController = require("../controllers/authController");
const bookController = require("../controllers/bookController");
const catalogController = require("../controllers/catalogController");
const defaultController = require("../controllers/defaultController");
const homeController = require("../controllers/homeController");
const { hasUser } = require("../middlewares/guards");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/catalog', catalogController);
    app.use('/books', hasUser(), bookController);
    app.use('*', defaultController);
};