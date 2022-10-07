const http = require('http');
const router = require('./router')
const { catalogPage, createPage, createItem } = require('./controllers/catalogController');
const { homePage, aboutPage, defaultPage } = require('./controllers/homeController');
const port = 3000;

router.get('/', homePage);
router.get('/catalog', catalogPage);
router.get('/create', createPage);
router.post('/create', createItem)
router.get('/about', aboutPage);
router.get('default', defaultPage);
router.post('default', defaultPage);

const server = http.createServer(router.match);

server.listen(port);

