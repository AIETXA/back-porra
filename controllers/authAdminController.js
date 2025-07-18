require('dotenv').config();


const mostrarLogin = (req, res) => {
  const error = req.query.error;
  res.send(`
    <h2>Iniciar Sesión</h2>
    ${error === '1' ? '<p style="color:red;">Credenciales incorrectas</p>' : ''}
    ${error === '2' ? '<p style="color:red;">Debes iniciar sesión</p>' : ''}
    <form method="POST" action="/login">
      <input type="text" name="user" placeholder="Usuario admin" required />
      <input type="password" name="pass" placeholder="Contraseña" required />
      <button type="submit">Entrar</button>
    </form>
  `);
};

const procesarLogin = (req, res) => {
  const { user, pass } = req.body;

  const validarUser = process.env.AUTH_USER;
  const validarPass = process.env.AUTH_PASS;

  if (user === validarUser && pass === validarPass) {
    req.session.authenticated = true;
    return res.redirect('/admin');
  }

res.redirect('/login?error=1');
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

module.exports = {
  mostrarLogin,
  procesarLogin,
  logout
};