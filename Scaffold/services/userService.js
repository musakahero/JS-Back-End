const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'q3dasdajoff123';


//TODO: Check if username is the credential, or something else (like email), or both in the assignment
async function register(username, password) {
    //TODO: If two or more credentials are unique, you might need to do the following check twice or more times for each credential. Don't forget to create Db indexing accordingly
    const existing = await User.findOne({ username })
        .collation({ locale: 'en', strength: 2 })

    if (existing) {
        throw new Error('Username is taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        hashedPassword
    });

    //TODO: see assignment if registration creates user session
    const token = createSession(user);
    return token;
};

//TODO: Check if username is the credential, or something else (like email), or both in the assignment
async function login(username, password) {
    const user = await User.findOne({ username })
    .collation({locale: 'en', strength: 2});

    if(!user){
        throw new Error('Invalid username or password!');
    };

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if(hasMatch == false){
        throw new Error('Invalid username or password!');
    };

    const token = createSession(user);
    return token;
};

function createSession({ _id, username }) {
    const payload = {
        _id,
        username
    };

    const token = jwt.sign(payload, JWT_SECRET);
    return token;
};

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
};

module.exports = {
    register,
    login,
    verifyToken
};