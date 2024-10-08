const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index");
const { db } = require("../db/connection");
const musiciansRouter = require("../routes/musicians.js");
const bandRouter = require("../routes/bands.js");
app.use("/musicians", musiciansRouter);
app.use("/bands", bandRouter);

const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//TODO: Create a GET /musicians route to return all musicians

// app.get("/", async (req, res) => {
//     const musicians = await Musician.findAll();
//     res.json(musicians);
//   });

// app.get("/musicians/1", async (req, res) => {
//   const musician1 = await Musician.findByPk(1);
//   res.json(musician1);
// });
// app.get("/musicians/2", async (req, res) => {
//   const musician2 = await Musician.findByPk(2);
//   res.json(musician2);
// });
// app.get("/musicians/3", async (req, res) => {
//   const musician3 = await Musician.findByPk(3);
//   res.json(musician3);
// });

// app.get("/bands", async (req, res) => {
//   const bands = await Band.findAll();
//   res.json(bands);
// });

//EXPRESS

module.exports = app;
