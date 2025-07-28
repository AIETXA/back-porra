require('dotenv').config();
const jwt = require('jsonwebtoken')

const validarAdmin = process.env.AUTH_ADMIN;
const validarPass = process.env.AUTH_PASS;
const tokenSecret = process.env.JWT_SECRET;



const procesarLogin = (req, res) => {
  
const { admin, pass } = req.body;
  
if (admin === validarAdmin && pass === validarPass) {
    const token = jwt.sign({admin: admin}, tokenSecret, {expiresIn:'1h'} );
    
    return res.json({token});
  }

res.status(400).json({message:'Credenciales incorrectas'});
};


module.exports = { procesarLogin }
 