const url = require('url');
const fs = require('fs');
const path = require('path');
const cats = require('../data/cats.json');
const breeds = require('../data/breeds.json');

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if(pathname==='/' && req.method ==='GET'){
        //show home view
        const filePath = path.normalize(path.join(__dirname), '../views/home/index.html');
    } else {
        return true;
    }

}