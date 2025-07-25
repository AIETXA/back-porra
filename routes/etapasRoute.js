const express = require('express');
const router = express.Router()
const { obtenerTodasLasEtapas, obtenerEtapaPorId, crearEtapa, procesarEtapa } = require('../controllers/etapasController');
const authMiddleware = require('../middleware/authMiddleware');


router.use(authMiddleware)

router.post('/',  crearEtapa)

router.post('/:id/procesar', procesarEtapa )
router.get('/', obtenerTodasLasEtapas)
router.get('/:id', obtenerEtapaPorId)


module.exports = router;