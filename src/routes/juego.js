const express = require("express");
const router = express.Router();

const { juegoActualTerminado, juegoIniciado } = require("../middlewares/juego");
const { iniciarNuevaPartida, definirPalabraAAdivinar, juegoActual, letrasAcertadas, arriesgarLetra, arriesgarPalabra } = require("../controllers/juego");

router.post("/iniciarNuevaPartida", juegoActualTerminado, iniciarNuevaPartida);
router.post("/definirPalabraAAdivinar", juegoIniciado, definirPalabraAAdivinar);
router.get("/juegoActual", juegoIniciado, juegoActual);
router.get("/letrasAcertadas", juegoIniciado, letrasAcertadas);
router.post("/arriesgarLetra", juegoIniciado, arriesgarLetra);
router.post("/arriesgarPalabra", juegoIniciado, arriesgarPalabra);

module.exports = router;
