const net = require('net');

let HOST = '127.0.0.1';
let PORT = 40000;

let client = new net.Socket();
let buf = Buffer.alloc(4);
let timerId = null;

process.stdin.on('readable', ()=> {
    let x = process.stdin.read();
    client.connect(PORT, HOST, () => {
        timerId = setInterval(() => {
            client.write((buf.writeInt32LE(x, 0), buf));
        }, 1000);

        setTimeout(() => {
            clearInterval(timerId);
            client.end();
        }, 20000);
    });
})

client.on('data', (data)=>{console.log('From SERVER: ', data.readInt32LE());});
client.on('close', ()=>{console.log('Client CLOSED');});
