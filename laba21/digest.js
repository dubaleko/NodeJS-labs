const express = require("express");
const app = express();
const passport = require('passport');
const DigestStrategy = require('passport-http').DigestStrategy;
const {getCredential, verPassword} = require('./Users');
let logout = false;

passport.use(new DigestStrategy({gop:'auth'}, (user, done)=>{
    let rc = null;
        let cr = getCredential(user);
        if (!cr) rc = done(null, false);
        else rc = done(null, cr.user, cr.password);
        return rc;
}, (params, done)=>{
    console.log(' parms = ', params);
    done(null, true);
}
));

app.get('/login',(requset,response,next)=>{
    if (logout && requset.headers['authorization']){
        logout = false;
        delete requset.headers['authorization'];
    }
    next();}, passport.authenticate('digest',{session:false}),(request,response)=>{response.redirect('resource')})
.get('/resource', (request,response,next)=>{
    if (request.headers['authorization'] == undefined)
        response.redirect('login');
    else
        response.send('Congratulation your authorize in system');
}).get('/logout',(request,response)=>{
    logout = true;
    response.redirect('login');
})

app.use(function (request, response, next) {
    response.status(404).send("Not Found");
});

app.listen(3000);
console.log("http://localhost:3000/login");