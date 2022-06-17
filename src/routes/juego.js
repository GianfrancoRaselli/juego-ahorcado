const express = require("express");
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const { iniciarNuevaPartida, definirPalabraAAdivinar, letrasAcertadas, arriesgarLetra, arriesgarPalabra } = require("../controllers/juego");

router.post("/iniciarNuevaPartida", authenticate, iniciarNuevaPartida);
router.post("/definirPalabraAAdivinar", authenticate, definirPalabraAAdivinar);
router.get("/letrasAcertadas", letrasAcertadas);
router.post("/arriesgarLetra", arriesgarLetra);
router.post("/arriesgarPalabra", arriesgarPalabra);

module.exports = router;
