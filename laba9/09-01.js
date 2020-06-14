let http = require('http');

let options = {
    host: 'localhost',
    path: '/',
    port: 5000,
    method: 'GET'
}

const request = http.request(options, (response)=>{
    console.log('method: ', request.method);
    console.log('response: ', response.statusCode);
    console.log('statusMessage: ', response.statusMessage);
    console.log('remoteAddress: ', response.socket.remoteAddress);
    console.log('remotePort: ', response.socket.remotePort);
    console.log('response headers: ', response.headers);
    response.on('data', (data)=>{
        console.log('data: ', data.toString('utf-8'));
    });
});

request.on('error', (e)=>{console.log('error: ', e.message);});
request.end();