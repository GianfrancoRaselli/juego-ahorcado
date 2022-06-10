const jwt = require('jsonwebtoken');
const { Usuario } = require('../models/index');

const authenticate = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json("Access denied");
    } else {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json("Access denied");
        } else {
            try {
                const payload = jwt.verify(token, process.env.TOKEN_SECRET);
                const usuario = await Usuario.findById(payload._id);
                if (usuario) {
                    req.usuario = usuario;
                    next();
                } else {
                    return res.status(401).json("Access denied");
                }
            } catch (e) {
                return res.status(401).json("Access denied");
            }
        }
    }
}

module.exports = { authenticate };