
const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');
const loginAdminRoute = require('./routes/loginAdminRoute')
const adminPanelRoute = require('./routes/adminPanelRoute')
const authUserRoute = require('./routes/authUserRoute');
const corredoresRoute = require('./routes/corredoresRoute');
const porraRoute = require('./routes/porraRoute');
const etapasRoute = require('./routes/etapasRoute');


dotenv.config()
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));



app.use('/admin', loginAdminRoute, adminPanelRoute)


app.use('/api/user', authUserRoute)

app.use('/api/corredores', corredoresRoute)
app.use('/api/porras', porraRoute)
app.use('/api/etapas', etapasRoute)


app.get('/', (req, res) => {
    res.send('Empezando proyecto final')
});


app.listen(PORT,() => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})