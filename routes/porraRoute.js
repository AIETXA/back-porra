const express = require('express')
const router = express.Router()
const porraController = require('../controllers/porraController')
const authMiddleware = require('../middleware/authMiddleware')


router.get('/',authMiddleware, porraController.obtenerPorra),
router.post('/crear',authMiddleware, porraController.crearPorra)


module.exports = router;