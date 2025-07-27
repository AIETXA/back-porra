
const prisma = require('../config/prismaBBDD')

const getAllCorredores = async(req, res) => {
    try {
        const corredores = await prisma.corredor.findMany({
            orderBy: { dorsal: 'asc' }
        });
        res.json(corredores);

} catch (error) {
    console.log(error);
    res.status(404).json({message:'Error al intentar obtener todos los corredores'})
}
}

const getCorredorById = async(req, res) => {
    try {
        const dorsal = parseInt(req.params.dorsal); 
        if(isNaN(dorsal)){
            return res.status(400).json('Dorsal inválido')
        }
        const corredor = await prisma.corredor.findUnique({
            where: {dorsal},
            select: { nombre:true, apellido: true}
        });
        
        if(!corredor) {
            return res.status(404).json({message:'Corredor no encontrado'})
        }
        res.json(corredor)

    } catch(error) {
        console.log(error)
        res.status(404).json({message:'Error al intentar obtener corredor por ID'})
    }
}

module.exports = {
    getAllCorredores,
    getCorredorById
};
