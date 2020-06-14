const WebSocket = require('ws');
const fs = require('fs');

const ws = new WebSocket.Server({port:4000, host:'localhost', path:'/download'});
ws.on('connection', (wss)=>{
    const socketStream = WebSocket.createWebSocketStream(wss,{encoding:'utf-8'});
    let ReadFile = fs.createReadStream('./download/file_to_download.txt');
    ReadFile.pipe(socketStream);
});
ws.on('error', (e)=>{console.log('ws server error', e)});
console.log(`ws server: host:${ws.options.host}, port:${ws.options.port}, path:${ws.options.path}`);