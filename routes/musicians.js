const { Router } = require("express");
const Musician = require("../models/Musician");
const musiciansRouter = Router();

const { check, validationResult } = require("express-validator");

//FIND
musiciansRouter.get("/", async (req, res) => {
  const musicians = await Musician.findAll();
  res.json(musicians);
});

musiciansRouter.get("/:id", async (req, res) => {
  const musician = await Musician.findByPk(req.params.id);
  res.json(musician);
});

// CREATE
musiciansRouter.post(
  "/",
  [check(["name", "instrument"]).notEmpty().trim()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.array() });
    } else {
      const musician = await Musician.create({
        name: req.body.name,
        instrument: req.body.instrument,
      });
      res.status(201).json(musician);
    }
  }
);

//UPDATE

musiciansRouter.put("/:id", async (req, res) => {
  let musician = await Musician.findByPk(req.params.id);
  if (!req.body.name) {
    res.status(400).json({ error: "Missing musician name" });
    return;
  }
  if (!req.body.instrument) {
    res.status(400).json({ error: "Missing musician instrument" });
    return;
  }
  musician = await musician.update(req.body);
  res.status(204).json();
});

//DELETE
musiciansRouter.delete("/:id", async (req, res) => {
  let musician = await Musician.findByPk(req.params.id);

  if (!musician) {
    res.status(404).json({ error: "Musician not found" });
    return;
  }
  await musician.destroy();
  res.status(204).send();
});

module.exports = musiciansRouter;
