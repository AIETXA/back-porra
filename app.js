
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const rutasCorredores = require('./routes/corredoresRoute');
const loginRoute = require('./routes/loginRoute');
const authRoute = require('./routes/authRoute');
const porraRoute = require('./routes/porraRoute')

dotenv.config()
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', rutasCorredores);
app.use('/login', loginRoute);
app.use('/auth', authRoute)
app.use('/porras', porraRoute)

app.get('/', (req, res) => {
    res.send('Empezando proyecto final')
});


app.listen(PORT,() => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})