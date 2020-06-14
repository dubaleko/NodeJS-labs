const WebSocket = require('ws');

let k = 1;
let c = 0;
const ws = new WebSocket.Server({port:4000, host:'localhost', path:'/PingPong'});
ws.on('connection', (wss)=>{
    wss.on('pong', data=>{
        ++c;
    });
    setInterval(()=>{
        ws.clients.forEach(client=>{
            if(client.readyState === WebSocket.OPEN)
                client.send('11-03-server:'+(k++));
        });
    }, 15000);
    setInterval(()=>{
        if (c != 0)
        console.log('count of client: ', c);
        c = 0;
        ws.clients.forEach(client=>{
            if(client.readyState === WebSocket.OPEN){
                client.ping('server:ping');
            }
        });
    }, 5000);
});
ws.on('error', (e)=>{console.log('ws server error', e)});
console.log(`ws server: host:${ws.options.host}, port:${ws.options.port}, path:${ws.options.path}`);