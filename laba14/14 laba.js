const http = require('http');
const oracledb = require('oracledb');
const url = require('url');
const fs = require('fs');

http.createServer(async  function (request,response) {
    let connection;
    let params;
    let result;
    await oracledb.createPool({
        user: "C##DVVCORE",
        password: "newpass",
        connectString: "localhost/orcl",
        poolMax: 10
    });
    response.setHeader("Content-Type", "text/html; charset=utf-8;");

        request.on('data',   (data)=>{
            params = JSON.parse(data);
        })
        request.on('end', async ()=>{
            try {
                connection = await oracledb.getConnection();
                let pathArray = request.url.split('=');

                if (request.method == "GET") {
                    if (url.parse(request.url).pathname == "/") {
                        let page = fs.readFileSync('./14.html');
                        response.end(page)
                    } else if (url.parse(request.url).pathname == "/api/faculties")
                        result = await connection.execute("select * from  faculty");
                    else if (url.parse(request.url).pathname == "/api/pulpits")
                        result = await connection.execute("select * from pulpit");
                    else if (url.parse(request.url).pathname == "/api/subjects")
                        result = await connection.execute("select * from subject");
                    else if (url.parse(request.url).pathname == "/api/auditoriumstypes")
                        result = await connection.execute("select * from AUDITORIUM_TYPE");
                    else if (url.parse(request.url).pathname == "/api/auditorims")
                        result = await connection.execute("select * from AUDITORIUM");
                    response.end(JSON.stringify(result));
                }
                else if (request.method == "POST") {
                    if (url.parse(request.url).pathname == "/api/faculties") {
                        result = await connection.execute(
                            'INSERT INTO faculty VALUES (:faculty, :faculty_name)',
                            [params.faculty, params.faculty_name],
                            {autoCommit: true}
                        );
                    } else if (url.parse(request.url).pathname == "/api/pulpits") {
                        result = await connection.execute(
                            'INSERT INTO pulpit VALUES(:pulpit,:pulpit_name,:faculty)',
                            [params.pulpit, params.pulpit_name, params.faculty],
                            {autoCommit: true}
                        );
                    } else if (url.parse(request.url).pathname == "/api/subjects") {
                        result = await connection.execute(
                            'insert into subject values(:subject,:subject_name,:pulpit)',
                            [params.subject, params.subject_name, params.pulpit],
                            {autoCommit: true}
                        );
                    } else if (url.parse(request.url).pathname == "/api/auditoriumstypes") {
                        result = await connection.execute(
                            'insert into auditorium_type values(:auditorium_type,:auditorium_typename)',
                            [params.auditorium_type, params.auditorium_typename],
                            {autoCommit: true}
                        );
                    } else if (url.parse(request.url).pathname == "/api/auditorims") {
                        result = await connection.execute(
                            'insert into auditorium values(:auditorium,:auditorium_name,:auditorium_capacity,:auditorium_type)',
                            [params.auditorium, params.auditorium_name, params.auditorium_capacity, params.auditorium_type],
                            {autoCommit: true}
                        );
                        console.log("Add new auditorium");
                    }
                    response.end(JSON.stringify(result));
                } else if (request.method == "PUT") {
                    if (url.parse(request.url).pathname == "/api/faculties") {
                        let sql = "update faculty set faculty_name='" + params.faculty_name + "' where faculty='" + params.faculty + "'";
                        result = await connection.execute(sql, [], {autoCommit: true});
                    } else if (url.parse(request.url).pathname == "/api/pulpits") {
                        let sql = "update pulpit set pulpit_name='" + params.pulpit_name + "' where pulpit='" + params.pulpit + "'";
                        result = await connection.execute(sql, [], {autoCommit: true});
                    } else if (url.parse(request.url).pathname == "/api/subjects") {
                        let sql = "update subject set subject_name='" + params.subject_name + "' where subject='" + params.subject + "'";
                        result = await connection.execute(sql, [], {autoCommit: true});
                    } else if (url.parse(request.url).pathname == "/api/auditoriumstypes") {
                        let sql = "update subject set auditorium_typename='" + params.auditorium_typename + "' where auditorium_type='" + params.auditorium_type + "'";
                        result = await connection.execute(sql, [], {autoCommit: true});
                    } else if (url.parse(request.url).pathname == "/api/auditorims") {
                        let sql = "update subject set auditorium_capacity='" + params.auditorium_capacity + "' where auditorium='" + params.auditorium + "'";
                        result = await connection.execute(sql, [], {autoCommit: true});
                    }
                    response.end(JSON.stringify(result));
                } else if (request.method == "DELETE") {
                    if (request.url.includes("/api/faculties?faculty=")) {
                        let sql = "delete faculty where faculty ='" + pathArray[1] + "'";
                        result = await connection.execute(sql, [], {autoCommit: true});
                    } else if (request.url.includes("/api/pulpits?pulpit=")) {
                        let sql = "delete pulpit where pulpit ='" + pathArray[1] + "'";
                        result = await connection.execute(sql, [], {autoCommit: true});
                    } else if (request.url.includes("/api/subjects?subject=")) {
                        let sql = "delete subject where subject ='" + pathArray[1] + "'";
                        result = await connection.execute(sql, [], {autoCommit: true});
                    } else if (request.url.includes("/api/auditoriumstypes?auditype=")) {
                        let sql = "delete AUDITORIUM_TYPE  where AUDITORIUM_TYPE  ='" + pathArray[1] + "'";
                        result = await connection.execute(sql, [], {autoCommit: true});
                    } else if (request.url.includes("/api/auditorims?auditorium=")) {
                        let sql = "delete AUDITORIUM  where AUDITORIUM  ='" + pathArray[1] + "'";
                        result = await connection.execute(sql, [], {autoCommit: true});
                    }
                    response.end(JSON.stringify(result));
                }
            }catch (err) {
                response.statusCode = 400;
                response.statusMessage = err;
                response.end();
                console.error(err);
            }
            finally {
                await connection.close();
                await oracledb.getPool().close();
            }
        })
}).listen(3000);

console.log("http://localhost:3000/");