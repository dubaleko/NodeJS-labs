const WebSocket = require('ws');
const fs = require('fs');

const ws = new WebSocket('ws://localhost:4000/download');
ws.on('open', ()=>{
    const socketStream = WebSocket.createWebSocketStream(ws,{encoding:'utf-8'});
    let WriteFile = fs.createWriteStream('./file_to_download.txt');
    socketStream.pipe(WriteFile);
});