let http = require('http');

let params = '<request id="28"><x value="1"/><x value="2"/><x value="3"/><m value="h"/><m value="i"/></request>';
let options = {
    host: 'localhost',
    path: '/fifth',
    port: 5000,
    method: 'POST',
    headers: {
        'Content-Type': 'application/xml'
    }
}

const request = http.request(options,(response)=>{
    console.log('method: ', request.method);
    console.log('response: ', response.statusCode);
    console.log('statusMessage: ', response.statusMessage);
    response.on('data', (data)=>{
        console.log('data: ', data.toString('utf-8'));
    });
});

request.on('error', (e)=>{console.log('error: ', e.message);});
request.end(params);