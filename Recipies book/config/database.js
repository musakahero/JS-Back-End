const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

//TODO: Change database according to assignment
const CONNECTION_STRING = 'mongodb://localhost:27017/recipeBook'


module.exports = async (app) => {
    try {
        await mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');
        
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}