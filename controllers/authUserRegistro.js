require ('dotenv').config();
const prisma = require('../config/prismaBBDD');
const bcrypt = require('bcrypt');

 /*const userLogin = (req, res) => {
    const error = req.query.error;

  let mensaje = '';
    if(error === 'usuarioExiste') {
        mensaje = 'Este usuario ya está registrado';
    } else if (error === 'loginInvalido') {
        mensaje = 'Usuario o contraseña incorrectos'
    }

    res.send(`
        <h2>Iniciar sesión</h2>
        <form method="POST" action="/login">
            <input type="email" name="user" placeholder="Introduce tu correo" required/>
            <input type="password" name="pass" placeholder="Introduce tu contraseña" required/>
            <button type="submit">Acceder</button>
        </form>
        <p style="color:red;">${error}</p>
        <hr/>
        <h2>Registrarse</h2>
        <form method="POST" action="/registro">
            <input type="text" name="name" placeholder="Nombre" required/>
            <input type="text" name="lastname" placeholder="Apellido" required/>
            <input type="email" name="user" placeholder="Correo electrónico" required/>
            <input type="password" name="pass" placeholder="Contraseña" required/>
            <button type="submit">Registrarme</button> 
        </form>    

    `);
};*/

const procesarRegistro = async (req, res) => {
    const { name, lastname, email, password } = req.body;

    
    try {
        const existeUser = await prisma.user.findUnique({
            where: {email}
        });

        if(existeUser) {
            return res.status(400).json({message:'Este usuario ya está registrado'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const nuevoUser = await prisma.user.create({
            data: {
                name,
                lastname,
                email,
                password:hashedPassword
            }
        });

        return res.status(201).json({message:'Usuario registrado con exito', userId:nuevoUser.id})
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:'Error en el servidor, intente de nuevo'})

    };
};
    
const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({where: {email}});

        if(!user) {
            return res.status(401).json({message:'Usuario o contraseña incorrectos'})
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword) {
            return res.status(401).json({message:'Contraseña incorrecta'})
        }

        return res.status(201).json({message:'Login exitoso', userId:user.id})
    } catch(error) {
        console.error(error)
        return res.status(500).json({message:'Error en el servidor'})
    }
};
 


const logout = (req, res) => {
    req.session.destroy(() => {
        res.status(200).json({message:'Cierre de sesion exitoso'});
    });
};

module.exports = {
    userLogin,
    procesarRegistro,
    logout
}