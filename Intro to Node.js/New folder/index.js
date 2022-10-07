const http = require('http');
const port = 3000;
function homePage(req, res) {
    res.write(html(`
    <h1>Home Page</h1>
    <p>Welcome to our site</p>
    `));
    res.end();
};

function aboutPage(req, res) {
    res.write(html(`
    <h1>About Us</h1>
    <p>Contact: +1-555-3333</p>
    `));
    res.end();
};

function catalogPage(req, res) {
    res.write(html(`
    <h1>Catalog</h1>
    <p>List of items</p>
    `));
    res.end();
}

function defaultPage(req, res) {
    res.statusCode = 404;
    res.write(html(`
    <h1>404 Not Found</h1>
    <p>The resource you requested cannot be found</p>
    `));
    res.end();
};

const routes = {
    '/': homePage,
    '/about': aboutPage,
    '/catalog': catalogPage
};

const server = http.createServer((req, res) => {
   res.writeHead(200, {
    'Content-Type': 'text/plain',
   });
   res.write('Hello World!');
   res.end();
});

server.listen(port);




function html(body, title = 'Demo Site') {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>${title}</title>
    </head>
    <body>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/catalog">Catalog</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </nav>
        ${body}
    </body>
    </html>
    `
}

