const WebSocket = require('ws');

const ws = new WebSocket.Server({port:4000, host:'localhost', path:'/json'});
ws.on('connection', (wss)=>{
    wss.on('message',data=>{
        let mess  = JSON.parse(data);
        console.log('On message: ', mess);
        let k=0;
        wss.send(JSON.stringify({server:++k, client:mess.client, timestamp:new Date()}));
    });
});
ws.on('error', (e)=>{console.log('ws server error', e)});
console.log(`ws server: host:${ws.options.host}, port:${ws.options.port}, path:${ws.options.path}`);