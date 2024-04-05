const { Router } = require('express');

const router = Router();

router.get('/', (req,res) => {
    res.send('Catalog page');
});

router.get('/:productId', (req,res) => {
    console.log(req.params.productId);
    res.send('Product Details page');
});

router.get('/:category/:id', (req,res) => {
    console.log(req.params);
    res.send('Nested parameters');
});

module.exports = router;