const express = require('express');
const router = express.Router();
const prisma = require('../config/prismaBBDD')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middleware/authMiddleware')


router.get('/auth/:token', async (req, res) => {
    const { token } = req.params;

    try {
        const tokenOk = await prisma.token.findUnique({
            where: {token},
            include: {user:true}
        });

        if(!tokenOk) {
            return res.status(400).send('Token inválido');
        }
        if(tokenOk.expiracion < new Date()) {
            return res.status(400).send('Token vencido');
        }

        const datos= {userId: tokenOk.user.id, email: tokenOk.user.email};
        const jwtToken = jwt.sign(datos, JWT_SECRET, {expiresIn: '30d'});

        res.json({message: 'Login exitoso', token: jwtToken});

        await prisma.token.delete({where: {token}});

    } catch(error) {
        res.status(500).send('Error al procesar el token')
    }
});

router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});



module.exports = router