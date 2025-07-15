

async function enviarEmail(to, subject, html) {
    try {
     const { default : Resend } = await import('resend')
     const resend = new Resend(process.env.RESEND_API_KEY)
     
     const { data, error } = await resend.emails.send({
         from:"",
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