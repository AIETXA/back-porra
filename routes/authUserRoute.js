const express = require('express');
const router = express.Router();
const prisma = require('../config/prismaBBDD')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middleware/authMiddleware')
const authUserController = require('../controllers/authUserController');
const JWT_SECRET = process.env.JWT_SECRET;


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
        if(tokenOk.expiracion < new Date()) {
            
            return res.status(400).json({message:'Token vencido'});
        }
        
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

router.get('/porras', authMiddleware, async (req, res) => {
    const userId = req.user.userId;
    try {
       const porras = await prisma.porra.findMany({
        where: {userId},
        include: {
            corredores,
            etapas,
            resultados,
            ranking,

        }
       }) 
    } catch (error) {

    }
});


router.post('/login', authUserController.login);


module.exports = router