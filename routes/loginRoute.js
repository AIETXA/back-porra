const express = require('express');
const router = express.Router()
const loginController = require('../controllers/loginController');

router.post('/login', loginController.login);
router.get('/login', (req, res) => {
  res.send('<h1>Formulario de login aquí</h1>');
});


module.exports = router;