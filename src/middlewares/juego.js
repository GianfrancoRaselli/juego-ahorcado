const { obtenerJuego } = require("../store/juego");

const juegoIniciado = (req, res, next) => {
  const juego = obtenerJuego();

  if (!juego) return res.status(200).json("Partida no iniciada");
  return next();
};

module.exports = { juegoIniciado };
