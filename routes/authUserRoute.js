const express = require('express');
const router = express.Router();
const prisma = require('../config/prismaBBDD')
const authMiddleware = require('../middleware/authMiddleware')
const {dashboardUser} = require('../controllers/dashboardUser');
const { userLogin, procesarRegistro, logout } = require('../controllers/authUserRegistro')
const {obtenerRankingPorra} = require('../controllers/rankingPorras')

router.get('/auth/login', userLogin);
router.post('/login',procesarRegistro);

    
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

router.get('/login', logout);


module.exports = router