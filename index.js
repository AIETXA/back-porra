
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3000;
const rutasCorredores = require('./routes/corredoresRoute')
const loginRoute = require('./routes/loginRoute')


dotenv.config()

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', rutasCorredores);
app.use('/login', loginRoute);

app.get('/', (req, res) => {
    res.send('Empezando proyecto final')
});

app.listen(PORT,() => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})