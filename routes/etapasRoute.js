const express = require('express');
const router = express.Router()
const { obtenerTodasLasEtapas, obtenerEtapaPorNumero, crearEtapa, procesarEtapa } = require('../controllers/etapasController');
const authMiddleware = require('../middleware/authMiddleware');



router.get('/', /*authMiddleware ,*/ obtenerTodasLasEtapas)
router.get('/:numero', obtenerEtapaPorNumero)
router.post('/',  crearEtapa)
router.post('/procesar-etapa', procesarEtapa )


module.exports = router;