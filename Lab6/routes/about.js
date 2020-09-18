const express = require("express");
const router = express.Router();
const aboutData = require("../data/about.json");

router.get("/", async (req, res) => {
  try 
  {
    res.json(aboutData);
  } 
  catch (e) 
  {
    res.status(500).send();
  }
});

module.exports = router;
