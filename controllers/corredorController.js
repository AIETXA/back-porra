
const prisma = require('../config/prismaBBDD')

const getAllCorredores = async(req, res) => {
    try {
        const corredores = await prisma.corredor.findMany({
            orderBy: { dorsal: 'asc' }
        });
        res.json(corredores);

} catch (error) {
    console.log(error);
    res.status(500).send({message:'Error al intentar obtener todos los corredores'})
}
}

const getCorredorById = async(req, res) => {
    try {
        corredorId = await prisma.corredor.findUnique(id);
        res.json(corredorId)

    } catch(error) {
        console.log(error)
        res.status(500).send({message:'Error al intentar obtener corredor por ID'})
    }
}

module.exports = {
    getAllCorredores,
    getCorredorById
};
