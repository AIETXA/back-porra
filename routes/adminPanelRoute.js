const express = require('express');
const router = express.Router();
const adminSessionMiddleware = require('../middleware/sessionMiddleware')



router.get('/etapas', adminSessionMiddleware, (req, res) => {
    res.send('<h2><strong>Gestión de etapas</strong></h2><p>Acá vas a poder cargar y ver las etapas</p>')
});

router.get('/corredores', adminSessionMiddleware,(req, res) => {
    res.send('<h2><strong>Lista de corredores</strong></h2><p>Acá vas a poder ver y gestionar corredores</p>')
});

router.get('/listas', adminSessionMiddleware,(req, res) => {
    res.send('<h2><strong>Todas las listas</strong></h2><p>Acá vas a poder ver las porras de los usuarios</p>')
});

module.exports = router;