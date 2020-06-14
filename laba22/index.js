const fs = require('fs');
const https = require('https');
const express = require('express');

const cert = {
    key: fs.readFileSync('./certs/resourcePrivateKey.key', 'utf8'),
    cert: fs.readFileSync('./certs/resourceCert.crt', 'utf8')
};
const app = express();

app.get('/', (request, response) => {
    response.end('<h1>Hello world</h1>')
});

const httpsServer = https.createServer(cert, app);
httpsServer.listen(3034);
console.log('Listening to https://localhost:3034/');

//Generate Private key from CA side
//openssl genrsa -des3 -out caPrivateKey.key 2048

//Generate Certificate from CA side
//openssl req -x509 -new -days 365 -sha256 -key ./caPrivateKey.key -sha256 -out ./caCertificate.crt

//Generate Private key from Resource side
//openssl genrsa -out ./resourcePrivateKey.key 2048

//Generate Certificate request from Resource side
//openssl req -new -key ./resourcePrivateKey.key -out ./certRequest.csr -sha256 -config ./certificateConfig.cfg

//Generate Certificate for a Resource from CA side
//openssl x509 -req -days 365 -sha256 -in ./certRequest.csr -CA ./caCertificate.crt -CAkey ./caPrivateKey.key -CAcreateserial -out ./resourceCert.crt -extensions v3_req -extfile ./certificateConfig.cfg
