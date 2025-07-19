const express = require('express')
const router = express.Router()
const porraController = require('../controllers/porraController')
const adminSessionMiddleware = require('../middleware/sessionMiddleware')


router.get('/',adminSessionMiddleware, porraController.obtenerPorra),
router.post('/crear',adminSessionMiddleware, porraController.crearPorra)


module.exports = router;