const express = require("express");
const router = express.Router();

const { juegoActualTerminado, juegoIniciado } = require("../middlewares/juego");
const { iniciarNuevaPartida, definirPalabraAAdivinar, letrasAcertadas, arriesgarLetra, arriesgarPalabra } = require("../controllers/juego");

router.post("/iniciarNuevaPartida", juegoActualTerminado, iniciarNuevaPartida);
router.post("/definirPalabraAAdivinar", juegoIniciado, definirPalabraAAdivinar);
router.get("/letrasAcertadas", juegoIniciado, letrasAcertadas);
router.post("/arriesgarLetra", juegoIniciado, arriesgarLetra);
router.post("/arriesgarPalabra", juegoIniciado, arriesgarPalabra);

module.exports = router;
