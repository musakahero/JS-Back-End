function createImage(req, res){
    res.write('Create image')
    res.end();
}

module.exports = {
    createImage
}