var http = require('http');
var  fs = require('fs');

http.createServer(function (request, response) {
    if (request.url === '/html') {
        let html = fs.readFileSync('./index.html');
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        response.end(html);
    }
    if (request.url === '/png') {
        let png = fs.readFileSync('./photo.png');
        response.writeHead(200, {'Content-Type': 'image/png; charset=utf-8'})
        response.end(png);
    }
    if (request.url === '/api/name') {
        response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})
        response.end('Дубалеко Валентин Викторович');
    }
    if (request.url === '/xmlhttprequest') {
        let xmlhtmlrequest = fs.readFileSync('./xmlhttprequest.html');
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.end(xmlhtmlrequest);
    }
    if (request.url === '/fetch')
    {
        let fetch = fs.readFileSync('./fetch.html');
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.end(fetch);
    }
    if (request.url === '/jquery')
    {
        let jquery = fs.readFileSync('./jquery.html');
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.end(jquery);
    }
}).listen(5000);

console.log('http://localhost:5000/html');
console.log('http://localhost:5000/png');
console.log('http://localhost:5000/api/name');
console.log('http://localhost:5000/xmlhttprequest');
console.log('http://localhost:5000/fetch');
console.log('http://localhost:5000/jquery');