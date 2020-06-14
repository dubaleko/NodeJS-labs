const MongoClient = require("mongodb").MongoClient;
const http = require('http');
const url = require('url');
const dbUrl = 'mongodb://127.0.0.1:27017';

http.createServer( function (request,response) {
    let params;
    let results;
    let pathArray = request.url.split('=');
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

    request.on('data',   (data)=>{
        params = JSON.parse(data);
    })
    request.on('end', async (data)=>{
        try {
            let client = await MongoClient.connect(dbUrl,{ useUnifiedTopology: true });
            const db = await client.db("bstu");

            if (request.method == "GET"){
                if (url.parse(request.url).pathname == "/api/faculties") {
                    await db.collection("faculty").find().toArray(function(err, results){
                        response.end(JSON.stringify(results));
                    });
                } else if(url.parse(request.url).pathname == "/api/pulpits"){
                    await db.collection("pulpit").find().toArray(function(err, results){
                        response.end(JSON.stringify(results));
                    });
                }
            }
            else if (request.method == "POST") {
                if (url.parse(request.url).pathname == "/api/faculties") {
                    await db.collection("faculty").insertOne(params);
                    response.end("Faculty "+params.faculty+" add");
                } else if (url.parse(request.url).pathname == "/api/pulpits") {
                    await db.collection("pulpit").insertOne(params);
                    response.end("Pulpit "+params.pulpit+" add");
                }
            }
            else if (request.method == "PUT"){
                if (url.parse(request.url).pathname == "/api/faculties") {
                    await db.collection("faculty").findOneAndUpdate(
                        {faculty: params.faculty},
                        {$set: {faculty_name: params.faculty_name}}
                        );
                    response.end("Update faculty "+params.faculty)
                } else if(url.parse(request.url).pathname == "/api/pulpits") {
                    await db.collection("pulpit").findOneAndUpdate(
                        {pulpit: params.pulpit},
                        {$set: {pulpit_name: params.pulpit_name}}
                    );
                    response.end("Update pulpit "+params.pulpit);
                }
            }
            else if (request.method == "DELETE"){
                if (request.url.includes("/api/faculties?faculty=")) {
                    await db.collection("faculty").findOneAndDelete({faculty:pathArray[1]});
                    response.end("Delete faculty "+pathArray[1]);
                } else if (request.url.includes("/api/pulpits?pulpit=")) {
                    await db.collection("pulpit").findOneAndDelete({pulpit:pathArray[1]});
                    response.end("Delete pulpit "+pathArray[1]);
                }
            }
            await client.close();
        }
        catch (e) {
            console.log(e.message);
        }
    })
}).listen(3000);