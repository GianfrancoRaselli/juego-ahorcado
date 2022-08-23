const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const history = require("connect-history-api-fallback");

const dotenv = require("dotenv");
dotenv.config();

// initializations
const app = express();
const port = 4000;

// middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(
  express.static(path.resolve(__dirname, "../front/dist"), {
    maxAge: "1y",
    etag: false
  })
);
app.use(history());

// routes
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Server listening" });
});
app.use("/juego", require("./routes/juego"));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/dist/index.html"));
});

// starting the server
app.listen(process.env.PORT || port, () => {
  console.log("Server listening on port: " + process.env.PORT || port);
});
