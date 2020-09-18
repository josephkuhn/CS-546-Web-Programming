const session = require("express-session");
const express = require('express');
const router = express.Router();
const data = require("../data/users");
const uuid = require('node-uuid');

async function authenticated(req)
{
    try
    {
        let user = await data.findUser(req.cookies.AuthCookie);
        if (req.cookies.AuthCookie !== undefined && req.cookies.AuthCookie === user.username && user.username !== undefined)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    catch (e)
    {
        return false;
    }
};

router.get("/", async (req, res) => {
    if (await authenticated(req) === true)
    {
        res.redirect("/private");
    }
    else
    {
        res.render("login");
    }
    //res.render("login");
});

router.post("/login", async (req, res) =>
{
    if (!req.body.username || !req.body.password)
    {
        res.status(401).render("login", {error: "Either the username or password were not given."});
        return;
    }

    const info = req.body;
    const user = req.body.username; // try adding .main if this doesn't work
    const pass = req.body.password;

    let validUser = false;
    let validPass = false;
    let name;

    try
    {
        name = await data.findUser(user);
        validUser = true;
    }
    catch (e)
    {
        validUser = false;
    }

    try
    {
        if (await data.checkPass(user, pass) === true)
        {
            validPass = true;
        }
    }
    catch (e)
    {
        validPass = false;
    }

    if (validUser === true && validPass === true)
    {
        req.session.SessionID = uuid.v4();
        name.SessionID = req.session.SessionID;
        res.redirect("/private");
        return;
    }
    else
    {
        res.render("login", {error: "The username and/or password is incorrect."})
        res.status(401);
    }
})

router.get("/private", async (req, res) =>
{
    const user = await data.findID(req.session.SessionID);
    res.render("private", {data: user});
})

router.get("/logout", async (req, res) =>
{
    req.session.regenerate(function (err) 
    {
        req.session.SessionID = "";
    });
    res.render("logout", {title: "You have been logged out"});
});

module.exports = router;