const { juego } = require('../controllers/juego');

const juegoIniciado = async (req, res, next) => {
    if (!juego) return res.status(200).json("Partida no iniciada");
    return next();
}

module.exports = { juegoIniciado };
