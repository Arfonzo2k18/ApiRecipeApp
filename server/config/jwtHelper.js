// Creamos una constante que necesita el paquete jsonwebtoken.
const jwt = require('jsonwebtoken');

// Exportamos el módulo de verificación del token.
/**
 * params: Recibimos por parámetro el token y comprobamos si este escorrecto y no ha caducado.
 */
module.exports.verifyJwtToken = (req, res, next) => {
    var token;
    if ('authorization' in req.headers)
        token = req.headers['authorization'].split(' ')[1];

    if (!token)
        return res.status(403).send({ auth: false, message: 'Token no proporcionado.' });
    else {
        jwt.verify(token, process.env.JWT_SECRET,
            (err, decoded) => {
                if (err)
                    return res.status(500).send({ auth: false, message: 'Autenticación vía Token errónea.' });
                else {
                    req._id = decoded._id;
                    next();
                }
            }
        )
    }
}