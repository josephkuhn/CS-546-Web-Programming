const express = require("express");
const router = express.Router();
const expressHandlebars = require('express-handlebars');
const people = require("../data/people");

router.get("/", async (req, res) => {
    res.render('search');
});

router.get("/details/:id", async (req, res) => {
    const person = await people.findPersonById(Number(req.params.id));
    let error = "";
    if (person === null) 
    {
      error = "We're sorry, but no results were found for ID of ";
      res.status(400).render("error", {error: error, notFound: req.params.id});
      return;
    }
    res.render("personFound", {person: person, error: error});
  });

router.post("/search", async (req, res) => {
  const personName = req.body.personName;
  const results = await people.searchForString(personName);

  if (results.length <= 0) 
  {
    let error = "We're sorry, but no results were found for ";
    res.status(400).render("error", {error: error, notFound: personName});
    return;
  }
  res.render("peopleFound", {personName: personName, results: results});
});

module.exports = router;