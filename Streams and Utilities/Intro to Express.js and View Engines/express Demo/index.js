const express = require('express');
const catalogController = require('./catalogController');
const createController = require('./createController');

const app = express();

app.get('/' , (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.get('/img' , (req,res)=>{
    res.download(__dirname + '/clipboard01.jpg');
});


app.use('/create', createController);
app.use('/catalog', catalogController);

app.get('/data', (req, res) => {
    res.json([
        {
            name:'Peter',
            age: 25
        },
        {
            name: 'John',
            age: 31
        }
    ]);
})

app.all('*', (req,res)=> {
    res.status(404).send('404 Not Found');
});

app.listen(3000);