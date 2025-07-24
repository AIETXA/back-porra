const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const { obtenerTodasLasEtapas } = require('../controllers/etapasController')
const { getAllCorredores } = require('../controllers/corredorController')
const { obtenerTodasLasPorras } = require('../controllers/porraController')



router.get('/etapas', authMiddleware, obtenerTodasLasEtapas)
router.get('/corredores', authMiddleware, getAllCorredores );
router.get('/listas', authMiddleware, obtenerTodasLasPorras )




module.exports = router;