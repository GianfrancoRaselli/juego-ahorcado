const express = require("express");
const router = express.Router();

const { iniciarNuevaPartida, definirPalabraAAdivinar, letrasAcertadas, arriesgarLetra, arriesgarPalabra } = require("../controllers/juego");

router.post("/iniciarNuevaPartida", iniciarNuevaPartida);
router.post("/definirPalabraAAdivinar", definirPalabraAAdivinar);
router.get("/letrasAcertadas", letrasAcertadas);
router.post("/arriesgarLetra", arriesgarLetra);
router.post("/arriesgarPalabra", arriesgarPalabra);

module.exports = router;
