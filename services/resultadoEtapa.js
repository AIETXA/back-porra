const prisma = require('../config/prismaBBDD')


async function cargarResultados(numeroEtapa, dorsales) {
    try {
        const etapa = await prisma.etapa.findUnique({
            where: { numero: numeroEtapa }
    });

    if(!etapa) throw new Error('Etapa no encontrada');
    
    for(let i = 0; i < dorsales.length; i ++) {
        const dorsal = dorsales[i];
        const posicion = i + 1;

        const corredor = await prisma.corredor.findUnique({
            where: { dorsal }, 
        });
    
    if(!corredor) throw new Error(`Corredor con dorsal ${dorsal} no encontrado`)
            
    await prisma.resultadoEtapa.upsert({
        where: {
            etapaId_corredorId: {
            etapaId: etapa.id,
            corredorId: corredor.id
          }
        },
        update: { posicion },
        create: {
            etapaId: etapa.id,
            corredorId: corredor.id,
            posicion
        }
        });

    console.log(`Resultados cargados para etapa ${numeroEtapa}`);
    } 
    } catch(error) {
        console.error('Error al cargar resultados de la etapa')
    }
    
};



module.exports = cargarResultados
