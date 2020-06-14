let JsonRPCServer = require('jsonrpc-server-http-nats');
let server = new JsonRPCServer();

let  manyParams = (param) =>{
    if (!Array.isArray(param))
        throw  new Error('Need array');
    return param;
}

let twoParams = (param) =>{
    if (!Array.isArray(param))
        throw  new Error('Need array');
    if (param.length != 2)
        throw new Error('Need two params');
    return param;
}

server.on('sum',manyParams,(params,channel,response)=> response(null, params.reduce((a, b) => a + b)));
server.on('mul',manyParams,(params,channel,response)=>response(null, params.reduce((a, b) => a * b)));
server.on('div',twoParams,(params,channel,response)=>response(null, params[0] / params[1]));
server.on('proc',twoParams,(params,channel,response)=>response(null, params[0] * 100 / params[1]));

server.listenHttp({host: '127.0.0.1', port: 5000});