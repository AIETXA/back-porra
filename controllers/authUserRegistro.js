
require ('dotenv').config;

const userLogin = (req, res) => {
    const error = req.query.error;
    res.send(`
        <h2>Registrate</h2>
        <form method="POST" action="/login">
        <input type="email" name="user" placeholder="Introduce tu correo" required/>
        <input type="password" name="pass" placeholder="Introduce tu contraseña" required/>
        <button type="submit">Registrarme</button>
        </form> 
    `)
};

const procesarRegistro = (req, res) => {
    const { user, pass } = req.boby;

    const validarUser = process.env.AUTH_USER;
    const validarPass = process.env.AUTH_PASS;

    if (user === validarUser && pass === validarPass) {
        req.session.authenticated = true;
        return res.redirect('/dashboard')
    }

    res.redirect('/login?error=1');
};

const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};

module.exports = {
    userLogin,
    procesarRegistro,
    logout
}