const express = require('express')
const router = express.Router()
const porraController = require('../controllers/porraController')
const { obtenerRankingPorra } = require('../controllers/rankingPorras')
const authMiddleware = require('../middleware/authMiddleware')


router.get('/',authMiddleware, porraController.obtenerPorra);
router.get('/ranking', authMiddleware,obtenerRankingPorra);
router.post('/',authMiddleware, porraController.crearPorra);


module.exports = router;