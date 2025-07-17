const express = require('express');
const router = express.Router()
const { obtenerTodasLasEtapas, obtenerEtapaPorId, crearEtapa } = require('../controllers/etapasController')


router.get('/', obtenerTodasLasEtapas)
router.get('/:id', obtenerEtapaPorId)
router.post('/', crearEtapa)


module.exports = router;