const express = require('express');
const router = express.Router();
const corredorController = require('../controllers/corredorController');



router.get('/corredores', corredorController.getAllCorredores);
router.get('/corredorId', corredorController.getCorredorById);

module.exports = router 