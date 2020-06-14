const http = require('http');
const url = require('url');
const fs = require('fs');
const xm12js = require('xml2js');
const xmlbuilder = require('xmlbuilder');

let server = http.createServer(function (request,response) {

    if(request.method == 'GET'){
        if(url.parse(request.url).pathname == "/"){
            response.statusCode = 201;
            response.end(JSON.stringify({data: "first task of lab09"}));
        }
        else if(request.url.includes("/second")){
            x = Number(url.parse(request.url,true).query.x);
            let y = Number(url.parse(request.url,true).query.y);
            response.end(JSON.stringify({data: "Second task of lab09. Params: "+x+", "+y}));
        }
        else if(url.parse(request.url).pathname == "/eighth"){
            let bound ='smw60-smw60-smw60';
            let body ='--'+bound+'--\n'+
                'Content-Disposition:form-data; name="file"; filename="MyFile.txt"\n'+
                'Content-Type:text/plain\n\n'+
                fs.readFileSync('./MyFile.txt')+
                `\n--${bound}--\n`
            response.end(body);
        }
    }
    else if (request.method == 'POST'){
        request.on('data', function (data) {
            if (url.parse(request.url).pathname == ("/third")){
                let body = JSON.parse(data);
                response.end(JSON.stringify({data: "Third task of lab09. Params: "+body.x+", "+body.y+", "+body.s}))
            }
            else if(url.parse(request.url).pathname == ("/fourth")){
                let body = JSON.parse(data);
                response.end(JSON.stringify({
                    comment: 'Response.'+ body.comment.split('.')[1],
                    x_plus_y: body.x + body.y,
                    Concatination_s_o: body.s +':'+ body.o.surname+','+body.o.name,
                    Length_m: body.m.length
                }));
            }
            else if (url.parse(request.url).pathname == ("/fifth")){
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
            }
            else if (url.parse(request.url).pathname == ("/sixth")){
                response.end(data);
            }
            else if (url.parse(request.url).pathname == ("/seventh")){
                response.end(data);
            }
        })
    }
}).listen(5000);

console.log('Server running at http://localhost:5000/');