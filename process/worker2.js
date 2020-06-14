const {parentPort} =require('worker_threads');

console.log('start w1');

setInterval(()=>{console.log('w1')},6000);
parentPort.on('message', (m)=>{console.log(m)});