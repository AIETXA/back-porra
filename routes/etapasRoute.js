const express = require('express');
const router = express.Router()
const { obtenerTodasLasEtapas, obtenerEtapaPorNumero, crearEtapa, procesarEtapa } = require('../controllers/etapasController');
const adminSessionMiddleware = require('../middleware/sessionMiddleware');



router.get('/', adminSessionMiddleware , obtenerTodasLasEtapas)
router.get('/:numero',adminSessionMiddleware  , obtenerEtapaPorNumero)
router.post('/', adminSessionMiddleware, crearEtapa)
router.post('/procesar-etapa', adminSessionMiddleware, procesarEtapa )


module.exports = router;