const { Schema, model } = require("mongoose");

const usuarioSchema = new Schema(
  {
    nombreUsuario: {
      type: String,
      unique: true,
      required: true,
      minLength: 6,
      maxLength: 25,
    },
    clave: {
      type: String,
      required: true,
      select: false,
    },
    nombreApellido: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      maxLength: 320,
    },
  },
  { collection: "usuarios", timestamps: false }
);

module.exports = model("Usuario", usuarioSchema);