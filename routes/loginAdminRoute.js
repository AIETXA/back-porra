const express = require('express');
const router = express.Router();
const adminSessionMiddleware = require('../middleware/sessionMiddleware')
const { mostrarLogin, procesarLogin, logout } = require('../controllers/authAdminController')

router.get('/login', mostrarLogin);
router.post('/login', procesarLogin);

router.get('/', adminSessionMiddleware, (req, res) => {
    res.send(`
        <!DOCTYPE html>
            <html lang="es">
            <head>
            <meta charset="UTF-8" />
            <title>Panel de Administración</title>
            <style>
                body {
                font-family: sans-serif;
                background-color: #f7f7f7;
                padding: 2rem;
                color: #333;
                }
                h2 {
                color: #0066cc;
                }
                ul {
                list-style: none;
                padding: 0;
                }
                li {
                margin: 1rem 0;
                }
                a {
                text-decoration: none;
                background-color: #0066cc;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                }
                a:hover {
                background-color: #004999;
                }
            </style>
            </head>
            <body>
            <h2>Bienvenido al Panel de Administración</h2>
            <p>Selecciona una opción:</p>
            <ul>
                <li><a href="/admin/etapas">Cargar o ver etapas</a></li>
                <li><a href="/admin/corredores">Ver corredores</a></li>
                <li><a href="/admin/listas">Ver listas</a></li>
                <li><a href="/admin/logout">Cerrar sesión</a></li>
            </ul>
            </body>
            </html>
  `);
});

router.get('/logout', logout);



module.exports = router