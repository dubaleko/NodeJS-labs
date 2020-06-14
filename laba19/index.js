const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRouter = require("./routers/userRouter.js");
const homeRouter = require("./routers/homeRouter");

app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", userRouter);
app.use("/",homeRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found");
});

app.listen(3000);
console.log("http://localhost:3000/");