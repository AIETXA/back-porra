const express = require('express');
const router = express.Router();
const prisma = require('../config/prismaBBDD')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middleware/authMiddleware')
const userController = require('../controllers/authUserController')
const {dashboardUser} = require('../controllers/dashboardUser');
const JWT_SECRET = process.env.JWT_SECRET;
const {obtenerRankingPorra} = require('../controllers/rankingPorras')

router.get('/auth/:token', async (req, res) => {
    const { token } = req.params;
  
    try {
        const tokenOk = await prisma.token.findUnique({
            where: {token},
            include: {user:true}
        });

        if(!tokenOk) {
            
            return res.status(400).json({message:'Token inválido'});
        }
        //if(tokenOk.expiracion < new Date()) {return res.status(400).json({message:'Token vencido'});}
        
        const datos= {userId: tokenOk.user.id, email: tokenOk.user.email};
        const jwtToken = jwt.sign(datos, JWT_SECRET, {expiresIn: '30d'});

        return res.json({ message: 'Login exitoso', token: jwtToken });

    } catch(error) {
        return res.status(500).json('Error al procesar el token')
    }
});

router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});


router.get('/porras/me', authMiddleware, async (req, res) => {
    try {
        const porras = await prisma.porra.findMany({
            where: { userId: req.user.userId },
                include: {
                    corredores: { 
                        include: {
                            corredor: true }
                   }   } 
        });
        res.json({ porras });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener tus porras' });
    }
});

router.get('/etapas', async (req, res) => {
  const etapas = await prisma.etapa.findMany({ orderBy: { numero: 'asc' } });
  res.json({ etapas });
});

router.get('/ranking', obtenerRankingPorra);

router.get('/dashboard', authMiddleware, dashboardUser)

router.post('/login', userController.login)


module.exports = router