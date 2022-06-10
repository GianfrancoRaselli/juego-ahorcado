const { Schema, model } = require("mongoose");

const juegoSchema = new Schema(
  {
    
  },
  { collection: "juegos", timestamps: false }
);

module.exports = model("Juego", juegoSchema);
