const express = require('express');
const router = express.Router();
const corredorController = require('../controllers/corredorController');



router.get('/', corredorController.getAllCorredores);
router.get('/dorsal/:dorsal', corredorController.getCorredorById);

module.exports = router 