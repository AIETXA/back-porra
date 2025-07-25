const express = require('express');
const router = express.Router();
const { procesarLogin } = require('../controllers/authAdminController')



router.post('/login', procesarLogin);

   


module.exports = router