const { obtenerJuego, crearNuevoJuego } = require("../store/juego");

const iniciarNuevaPartida = (req, res) => {
  const juego = crearNuevoJuego();
  return res.status(200).json(juego);
};

const definirPalabraAAdivinar = (req, res) => {
  // request format: { "palabra": "test" }
  const palabraAAdivinar = req.body.palabra;
  obtenerJuego().definirPalabraAAdivinar(palabraAAdivinar);
  return res.status(200).json({ palabraAAdivinar: obtenerJuego().palabraAAdivinar });
};

const juegoActual = (req, res) => {
  return res.status(200).json({ juegoActual: obtenerJuego() });
};

const letrasAcertadas = (req, res) => {
  return res.status(200).json({ letrasAcertadas: obtenerJuego().letrasAcertadas });
};

const arriesgarLetra = (req, res) => {
  // request format: { "letra": "a" }
  const letra = req.body.letra;
  obtenerJuego().arriesgarLetra(letra);
  return res.status(200).json({ letrasAcertadas: obtenerJuego().letrasAcertadas, errores: obtenerJuego().erroresAcumulados, gano: obtenerJuego().ganado, perdio: obtenerJuego().perdido });
};

const arriesgarPalabra = (req, res) => {
  // request format: { "palabra": "test" }
  const palabra = req.body.palabra;
  obtenerJuego().arriesgarPalabra(palabra);
  return res.status(200).json({ letrasAcertadas: obtenerJuego().letrasAcertadas, gano: obtenerJuego().ganado, perdio: obtenerJuego().perdido });
};

module.exports = { iniciarNuevaPartida, definirPalabraAAdivinar, juegoActual, letrasAcertadas, arriesgarLetra, arriesgarPalabra };
