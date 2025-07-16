const express = require('express')
const router = express.Router()
const porraController = require('../controllers/porraController')

router.get('/', porraController.obtenerPorra),
router.post('/crear', porraController.crearPorra)


module.exports = router;