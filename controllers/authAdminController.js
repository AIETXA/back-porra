require('dotenv').config();
const jwt = require('jsonwebtoken')

const validarUser = process.env.AUTH_USER;
const validarPass = process.env.AUTH_PASS;
const tokenSecret = process.env.JWT_SECRET;



const procesarLogin = (req, res) => {
  const { user, pass } = req.body;


  if (user === validarUser && pass === validarPass) {
    const token = jwt.sign({admin: user}, tokenSecret, {expiresIn:'1h'} );
    
    return res.json({token});
  }

res.status(400).json({message:'Credenciales incorrectas'});
};


module.exports = { procesarLogin }
 