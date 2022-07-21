const { obtenerJuego, crearNuevoJuego } = require("../store/juego");

const iniciarNuevaPartida = (req, res) => {
  const juego = crearNuevoJuego();
  return res.status(200).json(juego);
};

const definirPalabraAAdivinar = (req, res) => {
  const { palabraAAdivinar } = req.body;
  obtenerJuego().definirPalabraAAdivinar(palabraAAdivinar);
  return res.status(200).json({ palabraAAdivinar: obtenerJuego().palabraAAdivinar });
};

const letrasAcertadas = (req, res) => {
  return res.status(200).json({ letrasAcertadas: obtenerJuego().letrasAcertadas });
};

const arriesgarLetra = (req, res) => {
  const { letra } = req.body;
  obtenerJuego().arriesgarLetra(letra);
  return res.status(200).json({ letrasAcertadas: obtenerJuego().letrasAcertadas });
};

const arriesgarPalabra = (req, res) => {
  const { palabra } = req.body;
  obtenerJuego().arriesgarPalabra(palabra);
  return res.status(200).json({ letrasAcertadas: obtenerJuego().letrasAcertadas });
};

module.exports = { iniciarNuevaPartida, definirPalabraAAdivinar, letrasAcertadas, arriesgarLetra, arriesgarPalabra };
