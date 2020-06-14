const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:4000/PingPong');
ws.on('open', ()=>{
    ws.on('pong', data =>{
        console.log(`on pong => ${data.toString()}`)
    });
    ws.on('message', mess =>{
        console.log(`server: ${mess.toString()}`)
    })
    setInterval(()=>{
        ws.ping('client: ping');
    }, 5000);
});