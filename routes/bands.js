const { Router } = require("express");
const Band = require("../models/Band");
const bandRouter = Router();

const { check, validationResult } = require("express-validator");

//FIND
bandRouter.get("/", async (req, res) => {
  const bands = await Band.findAll();
  res.json(bands);
});

bandRouter.get("/:id", async (req, res) => {
  const band = await Band.findByPk(req.params.id);
  res.json(band);
});

module.exports = bandRouter;
