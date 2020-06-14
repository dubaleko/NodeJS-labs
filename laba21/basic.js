const express = require("express");
const app = express();
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const {getCredential, verPassword} = require('./Users');
const session = require('express-session')(
    {
        resave: false,
        saveUninitialized: false,
        secret: '12345678'
    }
);

passport.use(new BasicStrategy((user,password,done)=>{
    console.log('passport.use',user,password);
    let rc = null;
    let cr = getCredential(user);
    if (!cr) rc = done(null,false,{message:'incorrect username'});
    else if (!verPassword(cr.password,password)) rc = done(null,false,{message: 'incorrect password'});
    else  rc = done(null,user);
    return rc;
}));

passport.serializeUser((user,done)=>{
    console.log('serialize', user);
    done(null,user);
});

passport.deserializeUser((user,done)=>{
    console.log('deserialize',user);
    done(null,user);
});


app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.get('/login',(requset,response,next)=>{
    if (requset.session.logout && requset.headers['authorization']){
        requset.session.logout = false;
        delete requset.headers['authorization'];
    }
    next();}, passport.authenticate('basic'), (request,response)=>{response.redirect('resource')}
).get('/resource',  (request, response, next)=>{
    if (request.headers['authorization'] == undefined)
        response.redirect('login');
    else
        response.send('Congratulation your authorize in system');
}).get('/logout',(request,response)=>{
    request.session.logout = true;
    response.redirect('login');
})

app.use(function (request, response, next) {
    response.status(404).send("Not Found");
});

app.listen(3000);
console.log("http://localhost:3000/login");