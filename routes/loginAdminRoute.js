const express = require('express');
const router = express.Router();
const adminSessionMiddleware = require('../middleware/sessionMiddleware')
const { mostrarLogin, procesarLogin, logout } = require('../controllers/authAdminController')

router.get('/login', mostrarLogin);
router.get('/', adminSessionMiddleware, (req,res) => {
    res.send(`
        <h2>Panel de Administración</h2>
            <ul>
            <li><a href="/admin/etapas">Cargar/Ver etapas</a></li>
            <li><a href="/admin/corredores">Ver corredores</a></li>
            <li><a href="/admin/porras">Ver porras</a></li>
            <li><a href="/logout">Cerrar sesión</a></li>
            </ul>
        `)
    });
router.post('/login', procesarLogin);
router.get('/logout', logout);



module.exports = router