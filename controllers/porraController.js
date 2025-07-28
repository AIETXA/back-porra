


const prisma = require('../config/prismaBBDD')

async function obtenerPorra(req, res) {
    try {
        const usuarioId = req.user.userId;
        const porras = await prisma.porra.findMany({ 
            where: {usuarioId},
            include: {
                  user: true, 
                    corredores: {
                        include: {
                            corredores: true
                        }   
        }}});
        res.json(porras)

    } catch (error) {
        console.error('No se pudo obtener la porra', error)
        return res.status(500).send({message:'Error al intentar obtener la porra'})
    }
    
};

async function obtenerTodasLasPorras(req, res) {
    try {
        const porras = await prisma.porra.findMany({
            include: {
                user: true,
                corredores: {
                    include: {
                        corredor: true
                    }
                }
            }
        });
        
        
        res.json(porras)

    } catch (error) {
        console.error('No se puede obtener la lista de las porras', error)
        return res.status(500).send({message:'Error al intentar obtener la lista de las porras'})
    }
}



async function crearPorra(req, res) {
    try{
        
        const usuarioId = req.user.userId;
        const { nombre, dorsales } = req.body;

        if(!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
            return res.status(400).send({message: 'El nombre de la lista es obligatorio'})
        }

        if(!Array.isArray(dorsales) || dorsales.length !== 15 || !dorsales.every(d =>typeof d==='number'))
            return res.status(400).send({message: 'Error al cargar los dorsales. Verifica que haya 15 dorsales tipo número'})
        
        const dorsalesDuplicados = new Set(dorsales).size !==dorsales.length;
        
        if(dorsalesDuplicados) {
            return res.status(400).send({message:'No puede haber dorsales duplicados'})
        }
        
    
        const nuevaPorra = await prisma.porra.create({
            data: {
                nombre: nombre.trim(),
                user: { connect: { id: usuarioId } }
                
            }
        });
        const corredores = await prisma.corredor.findMany({
                where: {dorsal: { in: dorsales }}
        });
         if(corredores.length !== 15) {
             const encontrados = corredores.map(c => c.dorsal);
            const faltantes = dorsales.filter(d => !encontrados.includes(d));
            return res.status(400).send({ message: 'Dorsales no encontrados: ' + faltantes.join(', ') });
            }
           
         
         const relacionCorredores = corredores.map(corredor => ({
            porraId: nuevaPorra.id,
            corredorId: corredor.id,
            
            }));

        await prisma.corredorPorra.createMany({
            data: relacionCorredores
            });
        
        res.status(201).send({ message: 'Porra creada correctamente', porra: nuevaPorra });

    } catch(error) {
        console.error('Error al crear la porra', error)
        return res.status(500).send({message: 'No se pudo crear la lista'})
    }
};

module.exports = {
    obtenerPorra,
    obtenerTodasLasPorras,
    crearPorra

}