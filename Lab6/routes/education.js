const express = require("express");
const router = express.Router();
const educationData = require("../data/education.json");

router.get("/", async (req, res) => {
  try 
  {
    res.json(educationData);
  } 
  catch (e) 
  {
    res.status(500).send();
  }
});

module.exports = router;
