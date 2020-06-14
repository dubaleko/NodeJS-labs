const WebSocket = require('ws');
const readline = require('readline');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on('line', (line)=>{
    const ws = new WebSocket('ws://localhost:4000/json');
ws.on('open', ()=>{
    ws.on('message', mess =>{
        console.log('On message: ', JSON.parse(mess));
    });
    ws.send(JSON.stringify({client:line, timestamp:new Date()}));
});
})