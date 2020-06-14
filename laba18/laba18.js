const Sequelize = require("sequelize");
const http = require("http");
const url = require("url");
const fs = require('fs');
const sequelize = new Sequelize("node", "root", "1234", {dialect: "mysql", host: "localhost"});
const {Faculty, Pulpit,Subject,AuditoriumType,Auditorium} = require('./Models/Models').ORM(sequelize);


http.createServer(function (request,response) {
    sequelize.authenticate()
        .then(()=>{
            console.log('Connect with database');
            let params;
            request.on('data', (data) =>{
                params =JSON.parse(data);
            })
            request.on('end', ()=>{
                try {
                    if (request.method == "GET") {
                        if (url.parse(request.url).pathname == "/") {
                            let page = fs.readFileSync('./18.html');
                            response.end(page)
                        }else if (url.parse(request.url).pathname == "/api/faculties") {
                            Faculty.findAll().then(faculties => {
                                response.end(JSON.stringify(faculties));
                            })
                        } else if (url.parse(request.url).pathname == "/api/pulpits"){
                            Pulpit.findAll().then(pulpits =>{
                                response.end(JSON.stringify(pulpits));
                            })
                        } else if (url.parse(request.url).pathname == "/api/subjects"){
                            Subject.findAll().then(subjects =>{
                                response.end(JSON.stringify(subjects));
                            })
                        } else  if (url.parse(request.url).pathname == "/api/auditoriumstypes"){
                            AuditoriumType.findAll().then(auditoriumType =>{
                                response.end(JSON.stringify(auditoriumType));
                            })
                        } else if (url.parse(request.url).pathname == "/api/auditoriums"){
                            Auditorium.findAll().then(auditorium=>{
                                response.end(JSON.stringify(auditorium));
                            })
                        } else {
                            response.statusCode = 404;
                            response.end();
                        }
                    }
                    else if (request.method == "POST"){
                        if(url.parse(request.url).pathname == "/api/faculties"){
                            Faculty.create({FACULTY:params.FACULTY, FACULTY_NAME:params.FACULTY_NAME}).catch(reason => {
                                response.statusCode = 400;
                                response.statusMessage = 'Faculty already exists';
                                response.end('Faculty already exists');
                            }).then(info=>{
                                response.end(JSON.stringify(info));
                            })
                        } else if (url.parse(request.url).pathname == "/api/pulpits"){
                            Pulpit.create({PULPIT:params.PULPIT, PULPIT_NAME:params.PULPIT_NAME,FACULTY:params.FACULTY}).catch(reason => {
                                response.statusCode = 400;
                                response.statusMessage = 'Pulpit already exists';
                                response.end('Pulpit already exists');
                            }).then(info=>{
                                response.end(JSON.stringify(info));
                            })
                        } else if (url.parse(request.url).pathname == "/api/subjects"){
                            Subject.create({SUBJECT:params.SUBJECT,SUBJECT_NAME:params.SUBJECT_NAME,PULPIT:params.PULPIT}).catch(reason => {
                                response.statusCode = 400;
                                response.statusMessage = 'Subject already exists';
                                response.end('Subject already exists');
                            }).then(info=>{
                                response.end(JSON.stringify(info));
                            })
                        } else if (url.parse(request.url).pathname == "/api/auditoriumstypes"){
                            AuditoriumType.create({AUDITORIUM_TYPE: params.AUDITORIUM_TYPE, AUDITORIUM_TYPENAME:params.AUDITORIUM_TYPENAME}).catch(reason => {
                                response.statusCode = 400;
                                response.statusMessage = 'Auditoriums type already exists';
                                response.end('Auditoriums type already exists');
                            }).then(info=>{
                                response.end(JSON.stringify(info));
                            })
                        } else if (url.parse(request.url).pathname == "/api/auditoriums"){
                            Auditorium.create({AUDITORIUM: params.AUDITORIUM, AUDITORIUM_NAME:params.AUDITORIUM_TYPE,
                                AUDITORIUM_CAPACITY:params.AUDITORIUM_CAPACITY, AUDITORIUM_TYPE:params.AUDITORIUM_TYPE}).catch(reason => {
                                response.statusCode = 400;
                                response.statusMessage = 'Auditoriums already exists';
                                response.end('Auditoriums already exists');
                            }).then(info=>{
                                response.end(JSON.stringify(info));
                            })
                        } else {
                            response.statusCode = 404;
                            response.end();
                        }
                    }
                    else if (request.method == "PUT"){
                        if (url.parse(request.url).pathname == "/api/faculties") {
                            Faculty.update({FACULTY_NAME:params.FACULTY_NAME},
                                {where:{FACULTY:params.FACULTY}}).then(info => {
                                    if (info == 0){
                                        response.statusCode = 400;
                                        response.statusMessage = 'Faculty not exist';
                                        response.end("Faculty not exist");
                                    }
                                    else
                                        response.end(JSON.stringify(params));
                            })
                        } else if (url.parse(request.url).pathname == "/api/pulpits"){
                            Pulpit.update({PULPIT_NAME:params.PULPIT_NAME},
                                {where:{PULPIT:params.PULPIT}}).then(info => {
                                if (info == 0){
                                    response.statusCode = 400;
                                    response.statusMessage = 'Pulpit not exist';
                                    response.end("Pulpit not exist");
                                }
                                else
                                    response.end(JSON.stringify(params));
                            })
                        }else if (url.parse(request.url).pathname == "/api/subjects"){
                            Subject.update({SUBJECT_NAME:params.SUBJECT_NAME},
                                {where:{SUBJECT:params.SUBJECT}}).then(info => {
                                if (info == 0){
                                    response.statusCode = 400;
                                    response.statusMessage = 'Subject not exist';
                                    response.end("Subject not exist");
                                }
                                else
                                    response.end(JSON.stringify(params));
                            })
                        }else if (url.parse(request.url).pathname == "/api/auditoriumstypes") {
                            AuditoriumType.update({AUDITORIUM_TYPENAME: params.AUDITORIUM_TYPENAME},
                                {where: {AUDITORIUM_TYPE: params.AUDITORIUM_TYPE}}).then(info => {
                                if (info == 0){
                                    response.statusCode = 400;
                                    response.statusMessage = 'Auditorium type not exist';
                                    response.end("Auditorium type not exist");
                                }
                                else
                                    response.end(JSON.stringify(params));
                            })
                        }else if (url.parse(request.url).pathname == "/api/auditoriums"){
                            Auditorium.update({AUDITORIUM_CAPACITY: params.AUDITORIUM_CAPACITY},
                                {where: {AUDITORIUM: params.AUDITORIUM}}).then(info => {
                                if (info == 0){
                                    response.statusCode = 400;
                                    response.statusMessage = 'Auditorium not exist';
                                    response.end("Auditorium not exist");
                                }
                                else
                                    response.end(JSON.stringify(params));
                            })
                        } else {
                            response.statusCode = 404;
                            response.end();
                        }
                    }
                    else if (request.method == "DELETE"){
                        let pathArray = request.url.split('=');
                        if (request.url.includes("/api/faculties?faculty=")){
                            Faculty.destroy({where:{FACULTY:pathArray[1]}}).then(info => {
                                if (info == 0){
                                    response.statusCode = 400;
                                    response.statusMessage = 'Faculty not exist';
                                    response.end("Faculty with this name don't exist");
                                }
                                else
                                    response.end(`Faculty ${pathArray[1]} deleted`);
                            })
                        } else if (request.url.includes("/api/pulpits?pulpit=")){
                            Pulpit.destroy({where:{PULPIT:pathArray[1]}}).then(info => {
                                if (info == 0){
                                    response.statusCode = 400;
                                    response.statusMessage = 'Pulpit not exist';
                                    response.end("Pulpit don't exist");
                                }
                                else
                                    response.end(`Pulpit ${pathArray[1]} deleted`);
                            })
                        }else if (request.url.includes("/api/subjects?subject=")){
                            Subject.destroy({where:{SUBJECT:pathArray[1]}}).then(info => {
                                if (info == 0){
                                    response.statusCode = 400;
                                    response.statusMessage = 'Subject not exist';
                                    response.end("Subject don't exist");
                                }
                                else
                                    response.end(`Subject ${pathArray[1]} deleted`);
                            })
                        }else if (request.url.includes("/api/auditoriumstypes?auditype=")) {
                            AuditoriumType.destroy({where: {AUDITORIUM_TYPE: pathArray[1]}}).then(info => {
                                if (info == 0){
                                    response.statusCode = 400;
                                    response.statusMessage = 'Auditorium type not exist';
                                    response.end("Auditorium type don't exist");
                                }
                                else
                                    response.end(`Auditorium type ${pathArray[1]} deleted`);
                            })
                        }else if (request.url.includes("/api/auditorims?auditorium=")){
                            Auditorium.destroy({where: {AUDITORIUM:pathArray[1]}}).then(info => {
                                if (info == 0){
                                    response.statusCode = 400;
                                    response.statusMessage = 'Auditorium not exist';
                                    response.end("Auditorium don't exist");
                                }
                                else
                                    response.end(`Auditorium ${pathArray[1]} deleted`);
                            })
                        } else {
                            response.statusCode = 404;
                            response.end();
                        }
                    }
                }
                catch (err) {
                    response.statusCode = 400;
                    response.statusMessage = err;
                    response.end();
                    console.error(err);
                }
            })
        }).catch(err => {
        console.log(err);
    })

}).listen(5000);
