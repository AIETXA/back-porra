
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;


function authMiddleware(req,res,next) {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader) { return res.status(401).json({ message: 'Token no provisto' });}

        const token = authHeader.split(' ')[1];
        if(!token) { return res.status(401).json({ message: 'Token mal formado' });}

        const datos = jwt.verify(token, JWT_SECRET)
        req.user = datos;
        next();

    } catch(error) {
        console.error(error)
        res.status(401).json({message:'Error de autenticacion'})
    }
}

module.exports = authMiddleware