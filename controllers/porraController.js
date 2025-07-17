


const prisma = require('../config/prismaBBDD')

async function obtenerPorra(req, res) {
    try {
        const usuarioId = req.user.userId;
        const porras = await prisma.porra.findMany({ 
            where: {usuarioId},
            include: {corredores: true}   
        });
        res.json(porras)

    } catch (error) {
        console.error({message: 'No se pudo obtener la lista', error})
        return res.status(400).send({message:'Error al intentar obtener la lista'})
    }
    
};

async function crearPorra(req, res) {
    try{
        const usuarioId = req.user.userId;
        const { nombre, dorsales } = req.body;

        if(!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
            return res.status(400).send({message: 'El nombre de la lista es obligatorio'})
        }

        if(!Array.isArray(dorsales || dorsales.length !== 15 || !dorsales.every(d =>typeof d==='number')))
            return res.status(400).send({message: 'Error al cargar los dorsales. Verifica que haya 15 dorsales tipo número'})
        
        const dorsalesDuplicados = new Set(dorsales).size !==dorsales.length;
        
        if(dorsalesDuplicados) {
            return res.status(400).send({message:'No puede haber dorsales duplicados'})
        }
        
    
        const nuevaPorra = await prisma.porra.create({
            data: {
                nombre: nombre.trim(),
                usuarioId,
                corredores: { connect: dorsales.map(dorsal => ({dorsal}))}
            }
        });

        res.status(201).send({ message: 'Porra creada correctamente', porra: nuevaPorra });

    } catch(error) {
        console.error({message:'Error al crear la porra', error})
        return res.status(400).send({message: 'No se pudo crear la lista'})
    }
};

module.exports = {
    obtenerPorra,
    crearPorra,

}