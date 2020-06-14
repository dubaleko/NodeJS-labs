var http = require('http');

http.createServer(function (request, response) {
    response.end('<h1>Hello World</h1>\n');
}).listen(3000);

console.log('Server working at http://localhost:3000');