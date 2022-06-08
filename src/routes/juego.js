const express = require("express");
const router = express.Router();

const Juego = require("../models/Juego");
let juego = null;

router.post("/iniciarNuevaPartida", (req, res) => {
  juego = new Juego();
  return res.status(200).json(juego);
});

module.exports = router;
