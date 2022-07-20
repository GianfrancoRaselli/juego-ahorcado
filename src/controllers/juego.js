const { obtenerJuego, crearNuevoJuego } = require("../store/juego");

iniciarNuevaPartida = (req, res) => {
  const juego = crearNuevoJuego();
  return res.status(200).json(juego);
};

definirPalabraAAdivinar = (req, res) => {
  const { palabraAAdivinar } = req.body;
  obtenerJuego().definirPalabraAAdivinar(palabraAAdivinar);
  return res.status(200).json({ palabraAAdivinar: obtenerJuego().palabraAAdivinar });
};

letrasAcertadas = (req, res) => {
  return res.status(200).json({ letrasAcertadas: obtenerJuego().letrasAcertadas });
};

arriesgarLetra = (req, res) => {
  const { letra } = req.body;
  obtenerJuego().arriesgarLetra(letra);
  return res.status(200).json({ letrasAcertadas: obtenerJuego().letrasAcertadas });
};

arriesgarPalabra = (req, res) => {
  const { palabra } = req.body;
  obtenerJuego().arriesgarPalabra(palabra);
  return res.status(200).json({ letrasAcertadas: obtenerJuego().letrasAcertadas });
};

module.exports = { iniciarNuevaPartida, definirPalabraAAdivinar, letrasAcertadas, arriesgarLetra, arriesgarPalabra };
