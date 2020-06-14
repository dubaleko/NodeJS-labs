const child = require('child_process');
const fp = child.fork('children.js');

const f = ()=>{console.log('parent');}
setInterval(f,3000);

let x = 0;
const s = () =>{fp.send(`from parent:${++x}`)};
setInterval(s,6000);