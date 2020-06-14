const net = require('net');

let HOST = '127.0.0.1';
let PORT = 40000;

let server = net.createServer((sock)=>{
    console.log('Server CONNECTED: '+sock.remoteAddress + ':' + sock.remotePort);
    sock.on('data', (data)=>{
        console.log('Server DATA: ', data.toString());
        sock.write('ECHO: '+data);
    });
    sock.on('close', ()=>{
        console.log('Socket CLOSED');
    });
}).listen(PORT, HOST);
