const express = require('express');
const router = express.Router();
const { procesarLogin, logout, mostrarAccesoLogin } = require('../controllers/authAdminController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/login', mostrarAccesoLogin)
router.post('/login', procesarLogin);

router.get('/', authMiddleware, (req, res) => {
    res.set('Cache-Control', 'no-store'); 
      
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
                color: #f90b96ff;
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
                background-color: #00cc36ff;
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
                <li><a href="http://localhost:5173/admin/etapas">Ver etapas</a></li>
                <li><a href="http://localhost:5173/admin/corredores">Ver corredores</a></li>
                <li><a href="http://localhost:5173/admin/listas">Ver listas</a></li>
                <li><a href="http://localhost:5173/admin/logout">Cerrar sesión</a></li>
            </ul>
            </body>
            </html>
  `);
});

router.get('/logout', authMiddleware  ,logout);



module.exports = router