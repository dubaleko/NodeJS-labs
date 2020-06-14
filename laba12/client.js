const RPCWebSocket = require('rpc-websockets').Client;

const socket = new RPCWebSocket('ws://localhost:5050');
socket.on('open', () => {
    socket.subscribe('changed');
    socket.on('changed', () => {
        console.log('File StudentList.json was changed');
    });
});