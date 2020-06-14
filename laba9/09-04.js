let http = require('http');

let params =  JSON.stringify({
    comment: "Request.laba",
    x: 1,
    y: 2,
    s: "Message",
    m: ["a", "b", "c"],
    o: {surname: "Dubaleko", name:"Valentin"}
});
let options = {
    host: 'localhost',
    path: '/fourth',
    port: 5000,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

const request = http.request(options, (response)=>{
    console.log('method: ', request.method);
    console.log('response: ', response.statusCode);
    console.log('statusMessage: ', response.statusMessage);
    response.on('data', (data)=>{
        console.log('data: ', data.toString('utf-8'));
    });
});

request.on('error', (e)=>{console.log('error: ', e.message);});
request.end(params);