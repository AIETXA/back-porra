//GET /porras — Obtener todas las porras del usuario logueado.

//POST /porras — Crear una nueva porra.

//PUT /porras/:id — Editar una porra existente.


const prisma = require('../config/prismaBBDD')

async function obtenerPorra(req, res) {
    try {
        const usuarioId = req.user.userId;
        const porras = await prisma.porra.findMany({ 
            where: {usuarioId},
            include: {corredores: true}   
        });
        req.json(porras)

    } catch (error) {
        console.error({message: 'No se pudo obtener la lista', error})
    }
    
};

async function crearPorra(req, res){
    try{
        const usuarioId = req.user.userId;
        const { nombre, dorsales } = req.body;

        const nuevaPorra = await prisma.porra.create({
            data: {
                nombre: req.body.nombre,
                usuarioId: req.user.userId,
                corredores: { connect: dorsales.map(dorsal => ({dorsal}))}
            }
        })
        res.status(201).json({ message: 'Porra creada', porra: nuevaPorra });

    } catch(error) {
        console.error({message:'Error al crear la lista', error})
    }
};

async function editarPorra(req, res) {
    try {

    } catch(error) {
        console.error({message: 'No se pudo editar la lista', error})
    }
    
}

module.exports = {
    obtenerPorra,
    crearPorra,
    editarPorra
}