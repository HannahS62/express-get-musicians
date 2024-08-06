const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index");
const { db } = require("../db/connection");

const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//TODO: Create a GET /musicians route to return all musicians

app.get("/musicians", async (req, res) => {
  const musicians = await Musician.findAll();
  res.json(musicians);
});

app.get("/musicians/1", async (req, res) => {
  const musician1 = await Musician.findByPk(1);
  res.json(musician1);
});
app.get("/musicians/2", async (req, res) => {
  const musician2 = await Musician.findByPk(2);
  res.json(musician2);
});
app.get("/musicians/3", async (req, res) => {
  const musician3 = await Musician.findByPk(3);
  res.json(musician3);
});

app.get("/bands", async (req, res) => {
  const bands = await Band.findAll();
  res.json(bands);
});

//EXPRESS

//FIND

app.get("/musicians/:id", async (req, res) => {
  const musician = await Musician.findByPk(req.params.id);
  res.json(musician);
});
// CREATE
app.post("/musicians", async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ error: "Missing musician name" });
    return;
  }
  if (!req.body.instrument) {
    res.status(400).json({ error: "Missing musician instrument" });
    return;
  }

  const musician = await Musician.create({
    name: req.body.name,
    instrument: req.body.instrument,
  });
  res.status(201).json(musician);
});

//UPDATE

app.put("/musicians/:id", async (req, res) => {
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
app.delete("/musicians/:id", async (req, res) => {
  let musician = await Musician.findByPk(req.params.id);

  if (!musician) {
    res.status(404).json({ error: "Musician not found" });
    return;
  }
  await musician.destroy();
  res.status(204).send();
});

module.exports = app;
