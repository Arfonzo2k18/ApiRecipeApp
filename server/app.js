require('./config/config');
require('./models/db');
require('./config/passportConfig');

const morgan = require('morgan');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const rtsIndex = require('./routes/index.router');

var app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', rtsIndex);

// Control de errores
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});

// Archivos estáticos
app.use('/static', express.static(path.join(__dirname, 'static')));

// Iniciar la escucha del servidor
app.listen(process.env.PORT, () => console.log(`Servidor iniciado en el puerto : ${process.env.PORT}`));