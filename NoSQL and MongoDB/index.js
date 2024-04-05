const mongoose = require('mongoose');
const Person = require('./models/Person');

const connectionString = 'mongodb://localhost:27017/testdb2';
start();

async function start() {
    await mongoose.connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    console.log('Database connected');

    const person = new Person({
        firstName: 'John',
        lastName: 'Smith',
        age: -3
    });
    await person.save();

    const data = await Person.find({});
    console.log(data[0].sayHi());
    console.log(data[0].name);


    await mongoose.disconnect();
}
    