const Juego = require("../models/Juego");

let juego;

iniciarNuevaPartida = (req, res) => {
  juego = new Juego();
  return res.status(200).json(juego);
};

definirPalabraAAdivinar = (req, res) => {
  const { palabraAAdivinar } = req.body;
  juego.definirPalabraAAdivinar(palabraAAdivinar);
  return res.status(200).json({ palabraAAdivinar: juego.palabraAAdivinar });
};

letrasAcertadas = (req, res) => {
  return res.status(200).json({ letrasAcertadas: juego.letrasAcertadas });
};

arriesgarLetra = (req, res) => {
  const { letra } = req.body;
  juego.arriesgarLetra(letra);
  return res.status(200).json({ letrasAcertadas: juego.letrasAcertadas });
};

arriesgarPalabra = (req, res) => {
  const { palabra } = req.body;
  juego.arriesgarPalabra(palabra);
  return res.status(200).json({ letrasAcertadas: juego.letrasAcertadas });
};

module.exports = { iniciarNuevaPartida, definirPalabraAAdivinar, letrasAcertadas, arriesgarLetra, arriesgarPalabra };
