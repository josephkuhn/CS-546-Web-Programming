const express = require("express");
const router = express.Router();
const storyData = require("../data/story.json");

router.get("/", async (req, res) => {
  try 
  {
    res.json(storyData);
  } 
  catch (e) 
  {
    res.status(500).send();
  }
});

module.exports = router;
