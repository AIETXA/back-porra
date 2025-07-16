/*require('dotenv').config();
const { token } = require('./controllers/loginController')
const { enviarEmail } = require('./services/mailer');

const email = 'ailenechaguibel@gmail.com';

   const loginLink = `http://localhost:3000/auth/${token}`;
    const subject = 'Enlace de acceso';
    const html = `
        <p>¡Hola! Hace click en el siguiente enlace para acceder:</p>
        <p><a href="${loginLink}">${loginLink}</a></p>
        <p>El enlace expirará en 10 minuto</p>`;


enviarEmail(email, subject, html, loginLink)
.then(() => console.log('Email enviado correctamente'))
.catch(() => console.error('Error al enviar el email', error))*/