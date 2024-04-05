const express = require('express');
const hbr = require('express-handlebars');

const handlebars = hbr.create({
    extname: '.hbs'
});

const app = express();

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

app.get('/', (req, res)=> {
    
    res.render('home', {
        title: 'Handlebars Demo',
        message: 'Hello there',
        product: {
            name: 'Product 1',
            price: 19.50,
            color: 'Beige'
        },
    });
})
app.listen(3000);

