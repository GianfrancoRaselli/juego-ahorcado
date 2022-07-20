const Juego = require("../models/Juego");

let juego;

const obtenerJuego = () => {
  return juego;
};

const crearNuevoJuego = () => {
  juego = new Juego();
  return juego;
};

module.exports = { obtenerJuego, crearNuevoJuego };
