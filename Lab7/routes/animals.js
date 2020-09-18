const express = require("express");
const router = express.Router();
const data = require("../data");
const animalsData = data.animals;

router.get("/:id", async (req, res) => {
  try {
    const animals = await animalsData.get(req.params.id);
    res.json(animals);
  } catch (e) {
    res.status(404).json({ error: "Animal not found" });
  }
});

router.get("/", async (req, res) => {
  try {
    const animalList = await animalsData.getAll();
    res.json(animalList);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  const animalsInfo = req.body;

  if (!animalsInfo) {
    res.status(400).json({ error: "You must provide data to create an animal" });
    return;
  }

  if (!animalsInfo.name) {
    res.status(400).json({ error: "You must provide a name for the animal" });
    return;
  }

  if (!animalsInfo.animalType) {
    res.status(400).json({ error: "You must provide a type for the animal" });
    return;
  }

  try {
    const newAnimals = await animalsData.create(
      animalsInfo.name,
      animalsInfo.animalType
    );
    res.json(newAnimals);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.put("/:id", async (req, res) => {
  const animalsInfo = req.body;

  if (!animalsInfo) {
    res.status(400).json({ error: "You must provide data to update an animal" });
    return;
  }

  if (!animalsInfo.newName && !animalsInfo.newType) {
    res.status(400).json({ error: "You must provide a name and/or a type for the animal" });
    return;
  }

  try {
    await animalsData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Animal not found" });
    return;
  }

  if (!animalsInfo.newName)
  {
    try {
        const updatedAnimals = await animalsData.updateType(req.params.id, animalsInfo.newType);
        res.json(updatedAnimals);
      } catch (e) {
        res.sendStatus(500);
      }
  }

  else if (!animalsInfo.newType)
  {
    try {
        const updatedAnimals = await animalsData.rename(req.params.id, animalsInfo.newName);
        res.json(updatedAnimals);
      } catch (e) {
        res.sendStatus(500);
      }
  }

  else
  {
    try {
        await animalsData.updateType(req.params.id, animalsInfo.newType);
      } catch (e) {
        res.sendStatus(500);
      }

    try {
        const updatedAnimals = await animalsData.rename(req.params.id, animalsInfo.newName);
        res.json(updatedAnimals);
        } catch (e) {
        res.sendStatus(500);
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await animalsData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Animal not found" });
    return;
  }

  try {
    await animalsData.remove(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
    return;
  }
});

module.exports = router;
