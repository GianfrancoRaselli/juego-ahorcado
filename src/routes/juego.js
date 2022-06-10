const express = require("express");
const router = express.Router();
const { authenticate } = require('../middlewares/auth');

const Juego = require("../models/Juego");
let juego = null;

router.post("/iniciarNuevaPartida", authenticate, (req, res) => {
  juego = new Juego();
  return res.status(200).json(juego);
});

router.post("/definirPalabraAAdivinar", authenticate, (req, res) => {
  const { palabraAAdivinar } = req.body;
  juego.definirPalabraAAdivinar(palabraAAdivinar);
  return res.status(200).json({ palabraAAdivinar: juego.palabraAAdivinar });
});

router.get("/letrasAcertadas", (req, res) => {
  return res.status(200).json({ letrasAcertadas: juego.letrasAcertadas });
});

router.post("/arriesgarLetra", (req, res) => {
  const { letra } = req.body;
  juego.arriesgarLetra(letra);
  return res.status(200).json({ letrasAcertadas: juego.letrasAcertadas });
});

router.post("/arriesgarPalabra", (req, res) => {
  const { palabra } = req.body;
  juego.arriesgarPalabra(palabra);
  return res.status(200).json({ letrasAcertadas: juego.letrasAcertadas });
});

module.exports = router;
