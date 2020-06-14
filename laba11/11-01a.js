const WebSocket = require('ws');
const fs = require('fs');

const ws = new WebSocket('ws://localhost:4000/upload');
ws.on('open', ()=>{
    let socket_stream = WebSocket.createWebSocketStream(ws,{encoding: 'utf-8'});
    let ReadFile = fs.createReadStream('./file_to_upload.txt');
    ReadFile.pipe(socket_stream);
});