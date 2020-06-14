var http = require('http');

function  funck(req) {
     let rc = '';
     for (key in req.headers)
        rc += '<h3>'+key+':'+req.headers[key]+'</h3>';
     return rc;
}

http.createServer(function (request, response) {
     response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
     response.end('<h1>Информация о запросе</h1>'+
        '<h3>Method:' + request.method+'</h3>'+
        '<h3>Uri:'+ request.url+'</h3>'+
        '<h3>HttpVersion:'+ request.httpVersion +'</h3>'+
         funck(request));
}).listen(3000);

console.log('Server working at http://localhost:3000/');

