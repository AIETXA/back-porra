const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

module.exports = {
    getAllCorredores
};