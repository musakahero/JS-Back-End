const http = require('http');

const server = http.createServer((request, response) => { 
    console.log('Request received');
    console.log(request.method);
    console.log(request.headers);
    console.log(request.url);

    if(request.url == '/'){
        response.writeHead(200, [
            'Content-Type', 'text/plain'
        ])
        response.write('Hello world!');
        response.end();
    } else {
        response.statusCode = 404;
        response.end();
    }

    
    
});

server.listen(3000);