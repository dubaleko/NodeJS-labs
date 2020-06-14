const redis = require('redis');
let http = require('http');
let url = require('url');

const  client = redis.createClient(6379);

http.createServer(function (request,response) {
    let start, finish;
    if (url.parse(request.url).pathname == "/get"){
        console.log("get");
        start = new Date();
        for (let i = 0; i < 10000; i++) {
            client.get("n" + i, function (err, res) {
                console.log("err: " + err + ', res: ' + res);
                if(i+1 == 10000)
                    checkTime(start,response);
            });
        }
    }
    else if (url.parse(request.url).pathname == "/set"){
        console.log("set");
        start = new Date();
        for (let i = 0; i < 10000; i++) {
            client.set("n" + i, i, function (err, res) {
                console.log("err: " + err + ', res: ' + res);
                if (i+1 == 10000)
                    checkTime(start,response);
            });
        }
    }
    else if(url.parse(request.url).pathname == "/del"){
        console.log("del");
        start = new Date();
        for (let i = 0; i < 10000; i++) {
            client.del("n" + i, function (err, res) {
                console.log("err: " + err + ', res: ' + res);
                if (i+1 == 10000)
                    checkTime(start,response);
            });
        }
    }
    else if (url.parse(request.url).pathname == "/incr"){
        console.log("incr");
        start = new Date();
        for (let i = 0; i < 10000; i++){
            client.incr("n"+i, function (err,res) {
                console.log("err: " + err + ', res: ' + res);
                if (i+1 == 10000)
                    checkTime(start,response);
            })
        }
    }
    else if (url.parse(request.url).pathname == "/decr"){
        console.log("decr");
        start = new Date();
        for (let i = 0; i < 10000; i++){
            client.decr("n"+i,function (err,res) {
                console.log("err: " + err + ', res: ' + res);
                if (i+1 == 10000)
                    checkTime(start,response);
            })
        }
    }
    else if (url.parse(request.url).pathname == "/hset"){
        console.log("hset");
        start = new Date();
        for (let i = 0; i< 10000;i++){
            client.hset("n","k", JSON.stringify({val:"value"}),function (err,res) {
                console.log("err: " + err + ', res: ' + res);
                if (i+1 == 10000){
                    checkTime(start,response);
                }
            })
        }
    }
    else if (url.parse(request.url).pathname == "/hget"){
        console.log("hget");0
        start = new Date();
        for (let i = 0; i< 10000;i++){
            client.hget("n","k",function (err,res) {
                console.log("err: " + err + ', res: ' + res);
                if (i+1 == 10000){
                    checkTime(start,response);
                }
            })
        }
    }
}).listen(5000);
client.on("ready", ()=>{console.log("ready")});
client.on("connect", ()=>{console.log("connect")});
client.on("end",()=>{console.log("end")});
console.log("http://localhost:5000/");

function checkTime(start,response){
    finish = new Date();
    console.log("Operation took " + (finish.getTime() - start.getTime()) + " ms");
    response.end("Operation took " + (finish.getTime() - start.getTime()) + " ms");
}