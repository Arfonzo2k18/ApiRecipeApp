const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }, (err) => {
    if (!err) { console.log('Conexión con mongodb realizada con éxito.'); }
    else { console.log('Error en conexión con mongodb: ' + JSON.stringify(err, undefined, 2)); }
});

require('./user.model');