const express = require('express');
const router = express.Router();
const { obtenerTodasLasEtapas } = require('../controllers/etapasController');

router.get('/', obtenerTodasLasEtapas); 

module.exports = router;