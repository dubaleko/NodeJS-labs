const {Worker, isMainThread, parentPort} = require('worker_threads');

console.log('start main');

let w1 = new Worker('./worker2.js');

setInterval(()=>{console.log('main')},3000);

w1.on('online',()=>{
    console.log('main:w1.on online');
    setTimeout((p)=>{w1.postMessage('MAIN')},7000);
})