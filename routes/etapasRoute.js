const express = require('express');
const router = express.Router()
const { obtenerTodasLasEtapas, obtenerEtapaPorNumero, crearEtapa, procesarEtapa } = require('../controllers/etapasController');
const authMiddleware = require('../middleware/authMiddleware');


router.use(authMiddleware)

router.post('/',  crearEtapa)

router.post('/:numero/procesar', procesarEtapa )
router.get('/', obtenerTodasLasEtapas)
router.get('/:numero', obtenerEtapaPorNumero)


module.exports = router;