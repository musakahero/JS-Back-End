const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'q3dasdajoff123';

//Register service
async function register(username, password) {

    const existing = await User.findOne({ username })
        .collation({ locale: 'en', strength: 2 });

    if (existing) {
        throw new Error('Username is taken');
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        hashedPassword
    });

    const token = createSession(user);
    return token;
};


//Login service
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

//Generate session token (JWT)
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