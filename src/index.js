const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

// initializations
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

// routes
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Server listening" });
});
app.use("/juego", require("./routes/juego"));

//starting the server
app.listen(process.env.PORT, () => {
  console.log("Server listening on port: " + process.env.PORT);
});
