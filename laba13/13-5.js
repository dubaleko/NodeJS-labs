const net = require('net');

let HOST = '127.0.0.1';
let PORT = 40000;
let k = 1;

let server = net.createServer((sock)=>{
    let clientId = k++;
    let sum = 0;
    console.log('Client '+ clientId + ' CONNECTED');

    sock.on('data', (data)=>{
        console.log(data.readInt32LE() + ' - received from client' + clientId);
        sum+=data.readInt32LE();
    });

    let buf = Buffer.alloc(4);
    let timerId = setInterval(()=>{
        console.log('Control sum for a client'+ clientId+':'+ sum);
        buf.writeInt32LE(sum, 0);
        sock.write(buf);
    }, 5000);

    sock.on('close', ()=>{
        console.log('Socket CLOSED:');
        clearInterval(timerId);
    });
}).listen(PORT, HOST);



