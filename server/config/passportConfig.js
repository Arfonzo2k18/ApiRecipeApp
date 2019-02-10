const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('usuario');

// Con este método podremos autenticarnos de manera local con el correo, usuario y la contraseña.
passport.use(
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {
            User.findOne({ email: username },
                (err, user) => {
                    if (err)
                        return done(err);
                    // Usuario desconocido.
                    else if (!user)
                        return done(null, false, { message: 'El email no está registrado.' });
                    // Contraseña errónea.
                    else if (!user.verifyPassword(password))
                        return done(null, false, { message: 'Contraseña errónea.' });
                    // Autenticación correcta.
                    else
                        return done(null, user);
                });
        })
);