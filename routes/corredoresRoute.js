const express = require('express');
const routes = express.Router();
const corredorController = require('../controllers/corredorController');


routes.get('/', (req, res) => {
    res.redirect('/');
});

routes.get('/corredores', corredorController.getAllCorredores);


module.exports = routes 