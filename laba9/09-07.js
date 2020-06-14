const http = require('http');
let fs = require('fs');

let bound ='smw60-smw60-smw60';
let body ='--'+bound+'--\n'+
    'Content-Disposition:form-data; name="file"; filename="MyFile.png"\n'+
    'Content-Type:image/png\n\n'+
    fs.readFileSync('./MyFile.png');+
    `\n--${bound}--\n`
let options = {
    host: 'localhost',
    path: '/seventh',
    port: 5000,
    method: 'POST',
    headers: {
        'Content-Type': 'image/png'
    }
}
const request = http.request(options,(response)=>{
    console.log('method: ', request.method);
    console.log('response: ', response.statusCode);
    console.log('statusMessage: ', response.statusMessage);
    response.on('data', (data)=>{
        console.log('data: ', data.toString('utf-8'));
    });
})
request.on('error', (e)=>{console.log('error: ', e.message);});
request.end(body);
