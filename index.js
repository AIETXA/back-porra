
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3000;

dotenv.config()

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Empezando proyecto final')
});

app.listen(PORT,() => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})