const { obtenerJuego } = require("../store/juego");

const juegoActualTerminado = (req, res, next) => {
  const juego = obtenerJuego();

  if (juego && !(juego.ganado || juego.perdido)) return res.status(200).json("Partida actual no terminada");
  return next();
};

const juegoIniciado = (req, res, next) => {
  const juego = obtenerJuego();

  if (!juego) return res.status(200).json("Partida no iniciada");
  return next();
};

module.exports = { juegoActualTerminado, juegoIniciado };
