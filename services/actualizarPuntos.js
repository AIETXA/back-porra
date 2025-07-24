const prisma = require('../config/prismaBBDD');
const tablasDePuntuaciones = require('../utils/puntuaciones')


async function calcularPuntosPorraPorEtapa(numeroEtapa, dorsales) {
    try {
        const etapa = await prisma.etapa.findUnique({
            where: { numero: numeroEtapa },
            include: { resultados: true }
        });

        if(!etapa) throw new Error('Etapa no encontrada')


        const tablaPuntos = tablasDePuntuaciones[etapa.tipo];
        if(!tablaPuntos) throw new Error('Error con el tipo de puntuacion')
    
        const todasLasPorras = await prisma.porra.findMany({
            include: {corredores: true}
        })


    for(const porra of todasLasPorras) {
       let puntosTotales = 0;
    
    for(const resultado of etapa.resultados){
        const corredorPorra = porra.corredores.find(c => c.id === resultado.corredorId)

        if(corredorPorra) {
            const puntos = tablaPuntos[resultado.posicion] || 0;
            puntosTotales += puntos;
        }
    }
    
    await prisma.porra.update({
        where: {id: porra.id},
        data: {
            puntosTotales:  puntosTotales
        }
    });
} 

} catch (error) {
        console.error('No se pudo actualizar el marcador')
    }
}

async function  calcularRanking() {
    const porras = await prisma.porra.findMany({
        orderBy: {puntosTotales:'desc'}
    });

    for(let i = 0; i < porras.length; i ++) {
        const porra = porras[i];

        await prisma.porra.update({
            where: { id: porra.id },
            data: {ranking: i + 1}
        })
    }

    console.log('Ranking actualizado correctamente')
}

module.exports = {
    calcularPuntosPorraPorEtapa,
    calcularRanking
}