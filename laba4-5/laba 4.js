let http = require('http');
let fs = require('fs');
let url = require('url');
let data = require('./module');

let db =  new  data.DB();

db.on('GET', (req, res)=>{
    res.end(JSON.stringify(db.get()));
    console.log('DB.GET');
});
db.on('POST', (req, res)=>{
    req.on('data', data=>{
        let r = JSON.parse(data);
        db.post(r);
    });
    console.log('DB.POST');
});
db.on('PUT', (req, res)=>{
    req.on('data', data=>{
        let  element = JSON.parse(data);
        db.put(element);});
    console.log('DB.PUT');
});
db.on('DELETE', (req, res)=>{
    req.on('data', data=>{
        let element = JSON.parse(data);
        db.delete(element)});
    console.log('DB.DELETE');
});
db.on('COMMIT', ()=>{
    db.commit();
    if(time_id !== null) commit_col = commit_col + 1;
});

http.createServer( function (request, response) {
    if (url.parse(request.url).pathname ===  '/'){
        let html = fs.readFileSync('./04.html');
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.end(html);
    }
    else if (url.parse(request.url).pathname === '/api/db')
    {
        db.emit(request.method, request, response);
        if(time_id !== null) request_col = request_col + 1;
        db.emit("COMMIT");
    }
    else if (url.parse(request.url).pathname === '/api/ss')
    {
        let jsonStat = JSON.stringify({
            Start_Time : time_start,
            Finish_Time : time_end,
            Request_count : request_col,
            Commit_count : commit_col
        });
        response.end(jsonStat);
    }
}).listen(5000);

let timeout_id = null;
let time_id = null;
let interval_id = null;
let chunk = null;
let time_start = null;
let time_end = null;
let commit_col = 0;
let request_col = 0;

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
    while ((chunk = process.stdin.read()) !== null)
    {
     let array =  chunk.trim().split(' ');
     let n = parseInt(array[1]);
     let flag = false;
     if (array.length === 2 && Number.isInteger(n)&& n > 0 || array.length === 1) {flag = true;}
      if (array[0] === "sd" && flag)
      {
          if (array.length === 2)
          {
              if (timeout_id === null) {
                  console.log("Server shutdown after " + n + " ms");
                  timeout_id = setTimeout(() => process.exit(5000), n);
              }
              else
              {
                  clearTimeout(timeout_id);
                  console.log("New time to shutdown server "+n+" ms");
                  timeout_id = setTimeout( ()=>process.exit(5000),n);
              }
          }
          else  if (array.length == 1)
          {
              console.log("Undo shutdown server");
              clearTimeout(timeout_id);
              timeout_id = null;
          }
      }
      else if (array[0] === "sc" && flag)
      {
          if(array.length === 2)
          {
              console.log("Starting periodic commit db");
              interval_id = setInterval(()=>db.commit(), n);
              interval_id.unref();
          }
          else if (array.length === 1 )
          {
              console.log("Stop periodic commit db");
              clearInterval(interval_id);
          }
      }
      else  if (array[0] === "ss" && flag)
      {
          if(array.length === 2)
          {
              console.log("Start collection statistics");
              time_start = Date.now();
              time_id = setTimeout(()=>{time_end =Date.now();console.log("Statistics collection completed")},n);
              time_id.unref();
          }
          else if (array.length === 1)
          {
              console.log("Stop collection statistics");
              clearTimeout(time_id);
              time_end = Date.now();
          }
      }
      else console.log("Pls enter command correct");
    }
})

console.log('http://localhost:5000/');