const express = require('express');
const app = express();
const {createClient} = require('webdav');
const fs = require('fs');

const client = createClient('https://webdav.yandex.ru',{username: 'contactdirectory@yandex.by',password:'14022000'});

app.post("/md/:dirName",(request,response)=>{
    let dirname = request.params.dirName;
    client.exists(dirname).then((result)=>{
        if (result){
            response.statusCode = 408;
            response.end('This directory already exists');
        }
        else {
            client.createDirectory(dirname);
            response.end('Directory '+dirname+' created');
        }
    })
})

app.post("/rd/:dirName",(request,response)=>{
    let dirname = request.params.dirName;
    client.exists(dirname).then((result)=>{
        if (result){
            client.deleteFile(dirname);
            response.end('Directory '+dirname+' deleted');
        }
        else {
            response.statusCode = 408;
            response.end('Directory with name '+dirname+' not exist');
        }
    })
})

app.post("/up/:fileName",(request,response)=>{
    let filename = '/myDirectory/'+request.params.fileName;
    client.exists(filename).then(()=>{
        let ws = client.createWriteStream(filename);
        request.pipe(ws);
        response.end("File uploaded check directory");
    }).catch(()=>{
        response.statusCode = 408;
        response.end("Something wrong and we not upload file");
    })
})

app.post("/down/:fileName",(request,response)=>{
    let filename = '/myDirectory/'+request.params.fileName;
    client.exists(filename).then((result)=>{
        if (result){
            client.createReadStream(filename).pipe(fs.createWriteStream('./files/'+request.params.fileName));
            response.end("File download check files directory")
        }
        else {
            response.statusCode = 404;
            response.end('We not find file with name '+ filename);
        }
    })
})

app.post("/del/:fileName",(request,response)=>{
    let filename = '/myDirectory/'+request.params.fileName;
    client.exists(filename).then((result)=>{
        if (result){
            client.deleteFile(filename);
            response.end('File '+request.params.fileName+' delete');
        }
        else {
            response.statusCode = 404;
            response.end('We not find file with name '+ filename);
        }
    })
})

app.post("/copy/:firstFile/:secondFile",(request,response)=>{
    let filename = '/myDirectory/'+request.params.firstFile;
    let secondFileName = '/myDirectory/'+request.params.secondFile;
    client.exists(filename).then((result)=>{
        if (result){
            client.copyFile(filename,secondFileName);
            response.end('File copy');
        }
        else {
            response.statusCode = 404;
            response.end('We not find file with name '+ request.params.firstFile);
        }
    }).catch(()=>{
        response.statusCode = 408;
        response.end("Something wrong and we not copy file");
    })
})

app.post("/move/:firstFile/:secondFile",(request,response)=>{
    let filename = '/myDirectory/'+request.params.firstFile;
    let secondFileName = '/myDirectory/'+request.params.secondFile;
    client.exists(filename).then((result)=>{
        if (result){
            client.moveFile(filename,secondFileName);
            response.end('File move');
        }
        else {
            response.statusCode = 404;
            response.end('We not find file with name '+ request.params.firstFile);
        }
    }).catch(()=>{
        response.statusCode = 408;
        response.end("Something wrong and we not move file");
    })
})

app.listen(5000);
