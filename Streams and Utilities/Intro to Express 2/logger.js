module.exports = () => (req, res, next) => {
    console.log('Handling POST request');
    console.log('Logging from Middleware');
    next();
}