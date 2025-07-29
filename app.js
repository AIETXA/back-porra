
const express = require('express');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
const loginAdminRoute = require('./routes/loginAdminRoute')
const adminPanelRoute = require('./routes/adminPanelRoute')
const authUserRoute = require('./routes/authUserRoute');
const corredoresRoute = require('./routes/corredoresRoute');
const porraRoute = require('./routes/porraRoute');
const etapasAdminRoute = require('./routes/etapasAdminRoute');
const etapasPublicRoute = require('./routes/publicRoutes')

dotenv.config()

const corsOptions = {
  origin: ['https://front-porra.netlify.app', 'http://localhost:5173' ],
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));



app.use('/admin', loginAdminRoute, adminPanelRoute)

app.use('/api/user', authUserRoute)


app.use('/corredores', corredoresRoute)

app.use('/api/porras', porraRoute)
app.use('/api/etapas', etapasAdminRoute)

app.use('/etapas', etapasPublicRoute)



app.get('/', (req, res) => {
    res.send('Empezando proyecto final')
});


app.listen(PORT,() => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})