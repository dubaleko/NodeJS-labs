let http = require('http');
let stat = require('./m07-01')('./static');

http.createServer((req, res) => {
    if(req.method=='GET'){
        if(stat.isStatic('html', req.url)) stat.sendFile(req,res, {'Content-Type':'text/html; charset=utf-8'});
        else if(stat.isStatic('css', req.url)) stat.sendFile(req,res, {'Content-Type':'text/css; charset=utf-8'});
        else if(stat.isStatic('js', req.url)) stat.sendFile(req,res, {'Content-Type':'text/javascript; charset=utf-8'});
        else if(stat.isStatic('png', req.url)) stat.sendFile(req,res, {'Content-Type':'image/png; charset=utf-8'});
        else if(stat.isStatic('docx', req.url)) stat.sendFile(req,res, {'Content-Type':'application/msword; charset=utf-8'});
        else if(stat.isStatic('json', req.url)) stat.sendFile(req,res, {'Content-Type':'application/json; charset=utf-8'});
        else if(stat.isStatic('xml', req.url)) stat.sendFile(req,res, {'Content-Type':'application/xml; charset=utf-8'});
        else if(stat.isStatic('mp4', req.url)) stat.sendFile(req,res, {'Content-Type':'video/mp4; charset=utf-8'});
        else {
            res.statusCode = 404;
            res.statusMessage = 'Resourse not found';
            res.end("HTTP ERROR 404: Resourse not found");
        }
    } else {
        res.statusCode = 405;
        res.statusMessage = 'Invalid method';
        res.end("HTTP ERROR 405: Invalid method");
    }
}).listen(5000);

console.log("http://localhost:5000/");