const RPCWebSocket = require('rpc-websockets').Server;
const fs = require('fs');
const students = require('./StudentList');
const http = require('http');
const url = require('url');

const socket = new RPCWebSocket({port: 5050, host: 'localhost', path: '/'});
socket.event('changed');
let pathArray;

http.createServer(function (request,response) {
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    pathArray = url.parse(request.url).pathname.split('/');
    if(request.method == 'GET'){
        if (url.parse(request.url).pathname == "/backup"){
            fs.readdir('./backup/', ((err, files) => {
                let list = [];
                files.forEach(async file => {
                    list.push({name:('./backup/' + file).toString()});
                });
                response.end(JSON.stringify(list));
            }));
        }
        else if (url.parse(request.url).pathname=='/') {
            response.end(JSON.stringify(students));
        }
        else if(pathArray.length-1 == 1 && Number.isInteger(Number(pathArray[1]))) {
            let student = students.find(s => s.id == pathArray[1]);
            if (student) {
                response.end(JSON.stringify(student));
            } else {
                response.end(JSON.stringify({error:'We not find student with this id'}));
            }
        }
    }
    else if (request.method == 'POST'){
        if (url.parse(request.url).pathname == '/') {
            request.on('data', (data) => {
                let body = JSON.parse(data);
                if (students.find(s => s.id == body.id)) {
                    response.end(JSON.stringify({error: 'Student with id:' + body.id + ' such already exists'}));
                } else {
                    students.push(body);
                    fs.writeFile('./StudentList.json', JSON.stringify(students, null, '  '), () => {
                    });
                    socket.emit('changed');
                    response.end(JSON.stringify(body));
                }
            })
        }
        else if (url.parse(request.url).pathname == '/backup'){
            const date = new Date();
            let backupFilePath = './backup/'
                + date.getFullYear() + '.'
                + date.getMonth() + '.'
                + date.getDate() + '.'
                + date.getHours() + '.'
                + date.getMinutes() + '.'
                + 'StudentList.json';
            setTimeout(() => {
                fs.copyFile('./StudentList.json', backupFilePath, err => {
                    if (err) {
                        response.end(JSON.stringify({error: err.message}));
                    }
                    response.end();
                });
            }, 2000);
        }
    }
    else if (request.method == 'PUT'){
        if (url.parse(request.url).pathname == "/") {
            request.on('data', (data) => {
                let body = JSON.parse(data);
                if (students.find(s => s.id == body.id)) {
                    students.splice(students.findIndex(s => s.id == body.id), 1);
                    students.push(body);
                    fs.writeFile('./StudentList.json', JSON.stringify(students, null, '  '), () => {
                    });
                    socket.emit('changed');
                    response.end(JSON.stringify(body));
                } else {
                    response.end(JSON.stringify({error: 'Student with id:' + body.id + ' not exists'}));
                }
            })
        }
    }
    else if (request.method == 'DELETE'){
        if(pathArray.length-1 == 1 && Number.isInteger(Number(pathArray[1]))){
            let student = students.find(s => s.id == pathArray[1]);
            if (student) {
                students.splice(students.findIndex(s => s.id == pathArray[1]), 1);
                fs.writeFile('./StudentList.json', JSON.stringify(students, null, '  '), () => {});
                response.end(JSON.stringify(student));
            } else {
                response.end(JSON.stringify({error:'We not find student with this id'}));
            }
        }
        else if (request.url.includes('/backup') && pathArray.length-1==2){
            fs.readdir('./backup/', (err, files) => {
                if (err) {
                    response.end(JSON.stringify({error: err.message}));
                }
                let providedBackupDate = request.url.split('/')[2];
                let year = '', month = '', day = '';
                for (let i = 0; i < providedBackupDate.length; i++) {
                    if (i < 4) {
                        year += providedBackupDate[i];
                    } else if (i < 6) {
                        month += providedBackupDate[i];
                    } else {
                        day += providedBackupDate[i];
                    }
                }
                providedBackupDate = new Date(Number(year), Number(month), Number(day));
                files.forEach(file => {
                    let dateParams = file.split('.').splice(0, 5);
                    let backupDate = new Date(
                        Number(dateParams[0]),
                        Number(dateParams[1]),
                        Number(dateParams[2]),
                        Number(dateParams[3]),
                        Number(dateParams[4]),
                    );
                    if (providedBackupDate < backupDate) {
                        fs.unlink('./backup/' + file, err => {
                            if (err) {
                                response.body = JSON.stringify({error: err.message});
                            }
                        })
                    }
                });
                response.end();
            });
        }
    }
}).listen(5000);

console.log('Listening to http://localhost:5000');
