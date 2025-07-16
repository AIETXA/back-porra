

async function enviarEmail(to, subject, html) {
    try {
     const { Resend } = await import('resend')
     const resend = new Resend(process.env.RESEND_API_KEY)
     
     const { data, error } = await resend.emails.send({
         from:'onboarding@resend.dev',
         to,
         subject,
         html
     });
    
     if (error) {
        return console.error({error});
     }
     console.log({ data });
 } catch (error) {
    console.error('Error al enviar el correo:', error);
 }

};

module.exports = { enviarEmail };