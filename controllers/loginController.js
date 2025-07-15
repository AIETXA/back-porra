const prisma = require('../config/prismaBBDD')
const { enviarEmail } = require('../services/mailer')
const crypto = require('crypto')


async function login(req,res) {
    const { email } = req.body; 
    try {
        let user = await prisma.user.findUnique({ where: {email}});

    if(!user) {
        user = await prisma.user.create(
            { data: {
                email: email,
                name: '',
                lastname: '',
                phone: '',
            }
        });
        return res.status(200).json({ message: "Login exitoso", user });
    }

    const token = crypto.randomBytes(20).toString("hex")

    await prisma.token.create({
        data: {
            token,
            userId: user.id,
            expiracion: new Date(Date.now() + 1000 *60 *10), //10min
        }
    });

    const loginLink = `http://localhost:3000/auth/${token}`;
    const subject = 'Enlace de acceso';
    const html = `
        <p>¡Hola! Hace click en el siguiente enlace para acceder:</p>
        <p><a href="${loginLink}">${loginLink}</a></p>
        <p>El enlace expirará en 10 minuto</p>`;

    await enviarEmail(email, subject, html);
        return res.status(200).json({message:' Enlace enviado correctamente'})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'No se pudo enviar el enlace'})
    }
}

module.exports = {login};