const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.send('<form method="POST"><input name="name"><button>Send</button></form>');
});
router.post('/', 
(req, res, next) => {
    console.log('Handling POST request');
    console.log('Logging from Middleware');
    next();
},
(req, res) => {
    res.redirect('/catalog');
});

module.exports = router;