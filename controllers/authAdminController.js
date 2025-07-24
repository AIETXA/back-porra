require('dotenv').config();
const jwt = require('jsonwebtoken')

const validarUser = process.env.AUTH_USER;
const validarPass = process.env.AUTH_PASS;
const tokenSecret = process.env.JWT_SECRET;


/*
const mostrarLogin = (req, res) => {
  const error = req.query.error;
  res.send(`
    <h2>Iniciar Sesión</h2>
    ${error === '1' ? '<p style="color:red;">Credenciales incorrectas</p>' : ''}
    ${error === '2' ? '<p style="color:red;">Debes iniciar sesión</p>' : ''}
    <form method="POST" action="/admin/login">
      <input type="text" name="user" placeholder="Usuario admin" required />
      <input type="password" name="pass" placeholder="Contraseña" required />
      <button type="submit">Entrar</button>
    </form>
  `);
};*/

const procesarLogin = (req, res) => {
  const { user, pass } = req.body;


  if (user === validarUser && pass === validarPass) {
    const token = jwt.sign({admin: user}, tokenSecret, {expiresIn:'1h'} );
    
    return res.json({token});
  }

res.status(400).json({message:'Credenciales incorrectas'});
};

const logout = (req, res) => {
  res.json({message:'Cierre de sesion exitoso'});
  
};

module.exports = {
  
  procesarLogin,
  logout
};