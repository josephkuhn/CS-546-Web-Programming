const session = require('express-session');
const express = require('express');
const handlebars = require("express-handlebars");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
const static = express.static(__dirname + "/public");
const routes = require("./routes");
const data = require("./data/users");

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}))

app.use(static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
app.engine("handlebars", handlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(async function(req, res, next)
{
    let auth = "(Non-Authenticated User)";
    if ((!req.session.SessionID) || (req.session.SessionID === undefined) || (req.session.SessionID === "") || (req.session.SessionID !== (await data.findID(req.session.SessionID)).SessionID))
    {
        auth = "(Non-Authenticated User)";
    }
    else
    {
        auth = "(Authenticated User)";
    }
    console.log("[" + new Date().toUTCString() + "]: " + req.method + " " + req.originalUrl + " " + auth);
    next();
});

app.get("/private", async function (req, res, next) 
{
    if ((!req.session.SessionID) || (req.session.SessionID === undefined) || (req.session.SessionID === "") || (req.session.SessionID !== (await data.findID(req.session.SessionID)).SessionID))
    {
        res.status(403).render("login", {error: "The user is not logged in."});
        return;
    }
    next();
});

routes(app);

app.listen(3000, () =>
{
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
})