let http = require('http');
let fs = require('fs');
let url = require('url');
const nodemailer = require('nodemailer');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    if (url.parse(req.url).pathname === '/' && req.method === 'GET')
    {
        res.end(fs.readFileSync('./06-02.html'));
    }
    if (url.parse(req.url).pathname === '/' && req.method === 'POST')
    {
        let body;
        req.on('data', chunk => {body = chunk.toString();});
        req.on('end', () =>{
            let params = JSON.parse(body);
            const transport = nodemailer.createTransport(
                {
                    host : 'smtp.yandex.ru',
                    port : 465,
                    secure : true,
                    auth: {
                        user: 'dubaleco@yandex.ru',
                        pass: 'Valentin14'
                    }
                });
            const  mail_options  = {
                from : params.sender,
                to: params.receiver,
                text: params.message
            };
            transport.sendMail(mail_options, function (error, info) {
                if(error) console.log(error);
                else console.log("Email sent");
            });
        });
    }
}).listen(5000);

console.log('http://localhost:5000/');