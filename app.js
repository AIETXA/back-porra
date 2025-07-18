
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const loginAdminRoute = require('./routes/loginAdminRoute')
const adminPanelRoute = require('./routes/adminPanelRoute')
const authUserRoute = require('./routes/authUserRoute');
const corredoresRoute = require('./routes/corredoresRoute');
const porraRoute = require('./routes/porraRoute');
const etapasRoute = require('./routes/etapasRoute');
const session = require('express-session');

dotenv.config()
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'miSecretoSuperSecreto',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 }
}));


app.use('/admin', loginAdminRoute)
app.use('/admin', adminPanelRoute)

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