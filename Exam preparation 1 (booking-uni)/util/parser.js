function parseError(error) {
    if (error.name == 'ValidationError') {
        //mongoose error
        const result = Object.values(error.errors).map(v => v.message);
        return result;
    } else {
        //other error
        return error.message.split('\n');
    }
};

module.exports = {
    parseError
};