const fs = require('fs');

start(); 

async function start() {
    
    const stream =  fs.createWriteStream('./bigFile.txt');
    
    for (let i = 0; i < 1000000000; i++) {
        const chunk = ('000000000000000' + (Math.random() * 9999999999999999 | 0).toString(16)).slice(-16);

        await new Promise(res => {
            stream.write(chunk, res); 
        });
    };

    stream.end();
}
