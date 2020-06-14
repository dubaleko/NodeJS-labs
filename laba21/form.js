const express = require("express");
const app = express();
const fs = require('fs');
const {getCredential, verPassword} = require('./Users');
const cp = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(cp());
app.use(express.urlencoded({extended:true}));
app.get('/login', (request,response,next)=>{
    if (!request.cookies.tocken) {
        console.log('/login');
        const rs = fs.ReadStream('./21.html');
        rs.pipe(response);
    }
    else response.redirect('/resource')
}).post('/login',(request,response,next)=>{
    console.log('params',request.body);
    let rc = null;
    let cr = getCredential(request.body.user);
    if (cr != undefined){
        if (verPassword(cr.password,request.body.password)){
            const data =  {
                user: request.body.user,
                password: request.body.password
            };
            let tocken = jwt.sign({ data }, 'MySuP3R_z3krtky')
            response.cookie('tocken', tocken).redirect('/resource');
        }
        else  response.redirect('login');
    }
    else response.redirect('/login');
}).get('/resource',(request,response,next)=>{
    if (request.cookies && request.cookies.tocken){
        jwt.verify(request.cookies.tocken ,'MySuP3R_z3krtky',function (err) {
            if (err){
                response.clearCookie('tocken').redirect('login');
            }
            else {
                response.send('Congratulation your authorize in system');
            }
        })
    }
    else response.redirect('/login');
}).get('/logout',(request,response,next)=>{
    if (request.cookies.tocken){
        response.clearCookie('tocken').redirect('/login');
    }
})

app.use(function (request, response, next) {
    response.status(404).send("Not Found");
});

app.listen(3000);
console.log("http://localhost:3000/login");