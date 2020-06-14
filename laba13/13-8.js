const net = require('net');
const readline = require('readline')

let HOST = '127.0.0.1';
let PORT;

let client = new net.Socket();
let buf = Buffer.alloc(4);
let timerId = null;
let k = 0;


process.stdin.on('readable', ()=> {
    let PORT = Number(process.stdin.read());
client.connect(PORT, HOST, ()=>{
    console.log('Client CONNECTED: '+client.remoteAddress + ':' + client.remotePort);

    timerId = setInterval(()=>{
        client.write((buf.writeInt32LE(k++, 0), buf));
    }, 1000);

    setTimeout(()=>{
        clearInterval(timerId);
        client.end();
    }, 20000);
});
})

client.on('data', (data)=>{console.log('From SERVER: ', data.toString());});
client.on('close', ()=>{console.log('Client CLOSED');});