const express = require('express');
const catalogController = require('./catalogController');
const createController = require('./createController');
const logger = require('./logger');

const app = express();

app.use('/static', express.static('public'));



app.use(logger());
app.use('/create', createController);
app.use('/catalog', catalogController);

app.get('/data', (req,res) => {
    res.json([
        {
            name:'Peter',
            age: 25
        },
        {
            name: 'John',
            age: 30
        }
    ])
})
app.all('*', (req,res) => {
    res.status(404).send('404 Not Found (Custom page)');
})
app.listen(3000);