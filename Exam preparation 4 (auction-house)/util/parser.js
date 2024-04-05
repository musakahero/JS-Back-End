function parseError(error) {
    if (error.name == 'ValidationError') {
        //mongoose error
        return Object.values(error.errors).map(v => v.message);
    } else {
        //other error
        return error.message.split('\n');
    }
};

module.exports = {
    parseError
};