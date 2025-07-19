const express = require('express');
const router = express.Router();
const adminSessionMiddleware = require('../middleware/sessionMiddleware')
const { obtenerTodasLasEtapas } = require('../controllers/etapasController')
const { getAllCorredores } = require('../controllers/corredorController')
const { obtenerTodasLasPorras } = require('../controllers/porraController')



router.get('/etapas', adminSessionMiddleware, obtenerTodasLasEtapas)
router.get('/corredores', adminSessionMiddleware, getAllCorredores );
router.get('/listas', adminSessionMiddleware, obtenerTodasLasPorras )




module.exports = router;