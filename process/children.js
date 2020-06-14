const child = require('child_process');

const f= () => {console.log('children')};
setInterval(f,6000);

process.on('message', (msg)=>{
    console.log(msg);
})