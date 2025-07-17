
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const rutasCorredores = require('./routes/corredoresRoute');
const loginRoute = require('./routes/loginRoute');
const authRoute = require('./routes/authRoute');
const porraRoute = require('./routes/porraRoute');
const etapasRoute = require('./routes/etapasRoute');


dotenv.config()
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/corredores', rutasCorredores);
app.use('/api/login', loginRoute);
app.use('/api/auth', authRoute)
app.use('/api/porras', porraRoute)
app.use('/api/etapas', etapasRoute),

app.get('/', (req, res) => {
    res.send('Empezando proyecto final')
});


app.listen(PORT,() => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})