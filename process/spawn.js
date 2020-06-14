//spawn , cmd ,pipe, 2 out
const spawn = require('child_process').spawn;
const  dir = spawn('cmd.exe',['/U','/C','dir']);
const  findstr = spawn('findstr',['/c:27-']);

dir.stdout.setEncoding('utf16le');
dir.stdout.pipe(findstr.stdin);

dir.stdout.on('data',(data)=>{
    console.log('dir stdout:\n',data.toString());
})

dir.on('close', (code)=>{
    console.log('dir close code: ', code);
})

findstr.stdout.on('data',(data)=>{
    console.log('findstr stdout:\n',data.toString());
})

findstr.on('close',(code)=>{
    console.log('findstr close code:',code);
})