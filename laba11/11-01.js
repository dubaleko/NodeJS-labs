const WebSocket = require('ws');
const fs = require('fs');

const ws = new WebSocket.Server({port:4000, host:'localhost', path:'/upload'});
ws.on('connection', (wss)=>{
    const socket_stream = WebSocket.createWebSocketStream(wss,{encoding:'utf-8'});
    let WriteFile = fs.createWriteStream('./upload/file_to_upload.txt');
    socket_stream.pipe(WriteFile);
});
ws.on('error', (e)=>{console.log('ws server error', e)});
console.log(`ws server: host:${ws.options.host}, port:${ws.options.port}, path:${ws.options.path}`);