const http = require('http');
const url = require('url');
const fs = require('fs');
const xm12js = require('xml2js');
const xmlbuilder = require('xmlbuilder');
let mp = require('multiparty');

let server = http.createServer(function (request,response) {
    response.setHeader('My-Header', 'text');
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

        if(request.method == 'GET'){
            if(url.parse(request.url).pathname == "/connection"){
                if(request.url.includes("/connection?set=")){
                    server.keepAliveTimeout =  Number(url.parse(request.url,true).query.set);
                }
                response.end('KeepAliveTimeout: '+server.keepAliveTimeout);
            }
            else if(url.parse(request.url).pathname == "/headers"){
                response.end("Response headers: "+JSON.stringify(response.getHeaders())+ '\n' +"Request headers:"+ JSON.stringify(request.headers));
            }
            else  if(request.url.includes("/parameter")){
                let x,y;
                if(url.parse(request.url).pathname == "/parameter") {
                    x = Number(url.parse(request.url, true).query.x);
                    y = Number(url.parse(request.url,true).query.y);
                }
                else if (url.parse(request.url).pathname.includes('/parameter/') && url.parse(request.url).pathname.split('/').length-1 == 3){
                    let pathArray = request.url.split('/');
                    x = Number(pathArray[2]);
                    y = Number(pathArray[3]);
                }
                if(Number.isInteger(x) && Number.isInteger(y)) {
                    response.end('x+y='+(x+y)+'<br>'+'x-y='+(x-y)+'<br>'+'x*y='+(x*y)+'<br>'+'x/y='+(x/y));
                }
                else {
                    response.end("Error");
                }
            }
            else if(url.parse(request.url).pathname == "/close"){
                response.end("Server shut down after 10 sec");
                setTimeout(close, 10000);
            }
            else if(url.parse(request.url).pathname == "/socket"){
                response.end('Client ip: '+ request.connection.remoteAddress+'<br>'+
                    'Client port: ' + request.connection.remotePort+'<br>'+
                    'Server ip: ' + request.connection.localAddress+'<br>'+
                    'Server port: ' +  request.connection.localPort
                );
            }
            else if(url.parse(request.url).pathname == "/req-data"){
                let data = [];
                request.on('data', chunk => data.push(chunk));
                request.on('end', () => {
                    console.log(data);
                    response.end();
                });
            }
            else if(url.parse(request.url).pathname == "/resp-status"){
                response.statusCode = Number(url.parse(request.url,true).query.code);
                response.statusMessage = url.parse(request.url,true).query.mess;

                if(Number.isInteger(response.statusCode)) {
                    response.end(response.statusCode + ":" + response.statusMessage);
                }
                else {
                    response.end("Error");
                }
            }
            else if(url.parse(request.url).pathname == "/formparameter"){
                response.end(fs.readFileSync('./files/09.html'));
            }
            else if(url.parse(request.url).pathname == "/files"){
                fs.readdir(  './files', (err, files) => {
                    if (err)
                        response.statusCode = 500;
                    response.end('X-static-files-count: '+files.length);
                });
            }
            else if (request.url.includes("/files/")){
                let filename = request.url.split('/')[2];
                fs.readFile('./files/' + filename, (err, data) => {
                    if (err) {
                        response.statusCode = 404;
                        response.end();
                    } else {
                        response.end(fs.readFileSync('./files/' + filename));
                    }
                })
            }
            else if(url.parse(request.url).pathname == "/upload"){
                response.end(fs.readFileSync('./files/14.html'));
            }
        }
        else if (request.method == 'POST'){
            let body;
            if (url.parse(request.url).pathname == "/formparameter"){
                request.on('data',(data) =>{
                   body = data.toString().replace('------WebKitFormBoundaryfh8CAzzf2MwwKxjK\n' +
                       'Content-Disposition: form-data; name=','').replace(new RegExp('&','g'),'<br>');
                    response.end(body);
                })
            }
            else if (url.parse(request.url).pathname == "/json"){
                // {
                //     "comment": ""Request.laba"",
                //     "x": 1,
                //     "y": 2,
                //     "s": "Сообщение",
                //     "m": ["a", "b", "c"],
                //     "o": {"surname": "Дубалеко", "name":"Валентин"}
                // }
                request.on('data',(data)=>{
                    body = JSON.parse(data);
                    let answer = {
                        comment: 'Response.'+ body.comment.split('.')[1],
                        x_plus_y: body.x + body.y,
                        Concatination_s_o: body.s +':'+ body.o.surname+','+body.o.name,
                        Length_m: body.m.length
                    };
                    response.end(JSON.stringify(answer));
                })
            }
            else if (url.parse(request.url).pathname == "/xml"){
                   // <request id = "28">
                   //  <x value="1"/>
                   //  <x value="2"/>
                   //  <x value="3"/>
                   //  <m value="h"/>
                   //  <m value="i"/>
                   //  </request>
                request.on('data',(data)=>{
                    let x = 0;
                    let m = '';
                    let id;
                    xm12js.parseString(data,function (err, result){
                        result.request.x.map((e,i)=>{
                            x = x + Number(e.$.value);
                        })
                        result.request.m.map((e,i)=>{
                            m = m + e.$.value;
                        })
                        id = result.request.$.id;
                    })
                    let xml = xmlbuilder.create('response').att('id',33).att('request',id)
                    xml.ele('sum',{element:'x',result:x});
                    xml.ele('concat',{element:'m',result:m});
                    response.end(xml.toString({pretty:true}));
                })
            }
            else if(url.parse(request.url).pathname == "/upload"){
                let form = new mp.Form({uploadDir:'./files'});
                form.on('part',function (part) {
                    let out = fs.createWriteStream('./files/'+part.filename);
                    part.pipe(out);
                })
                form.parse(request)
                response.end('File upload in directory');
            }
        }
}).listen(5000);

function close()
{
    server.close();
}

console.log("http://localhost:5000/");