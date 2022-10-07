const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.method == 'GET') {
        let path = req.url;

        if (path == '/') {
            path = '/index.html';
        };

        fs.stat(`./static${path}`, (err, stat) => {
            if (err != null || stat.isFile() != true) {
                res.writeHead(404);
                res.write('404 Not Found');
                res.end();
            } else {
                fs.createReadStream(`./static/${path}`).pipe(res);
            }
        });

    } else if (req.method == 'POST') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });

        req.on('end', () => {
            const result = JSON.parse(body.join(''));
            console.log(result);

            result.count++;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(result));
            res.end();
        });
    }
});

server.listen(3000);