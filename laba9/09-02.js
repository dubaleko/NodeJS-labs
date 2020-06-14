let http = require('http');

let options = {
    host: 'localhost',
    path: `/second?x=${3}&y=${4}`,
    port: 5000,
    method: 'GET'
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
request.end();