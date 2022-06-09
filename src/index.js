const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

//initializations
const PORT = 4000;
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

//routes
app.use('/juego', require('./routes/juego'));

//starting the server
app.listen(PORT, () => {
    console.log('Server on port: ' + PORT);
});
