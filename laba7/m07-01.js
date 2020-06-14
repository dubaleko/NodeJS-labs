function Stat(){
    let fs = require('fs');
    this.isStatic = (ext, fn)=>{
        let testExt = fn.split('.');
        return testExt[1] == ext;
    }
    this.sendFile = (req, res, headers)=>{
        fs.access('./static'+req.url, fs.constants.R_OK, err =>{
            if(err) {
                res.statusCode = 404;
                res.statusMessage = 'Resourse not found';
                res.end("HTTP ERROR 404: Resourse not found");
            }
            else {
                res.writeHead(200, headers);
                fs.createReadStream('./static'+req.url).pipe(res);
            }
        });
    }
}
module.exports=()=>{return new Stat();}