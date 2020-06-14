//exec
// const exec = require('child_process').exec;
// const dir = exec('dir',{encoding:'utf8'},(error,stdout,stderr)=>{
//     console.log(stdout);
// });

const exec = require('child_process').execFile;
const dir = exec('exec',
    { cwd: 'D:\\Univer\\sem6\\node js\\exec\\exec\\bin\\Debug' },
    (err, stdout, stderr) => {
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        else {
            console.log(`stdout: ${stdout}`);
        }
    });
dir.stdin.write('exam');
dir.stdin.end();