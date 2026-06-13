
/*const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const etapasJson = require('../data/recorridoOficial.json')

const mapTipoEtapa = (etapa, tipo) => {
    if (etapa === '-' && tipo.toLowerCase().includes('descanso')) return 'Descanso';

    const numero = parseInt(etapa);

    return 'EtapasDiarias'
}

const importarEtapas = async() => {

    for(const etapa of etapasJson) {
        if (!etapa.ETAPA || isNaN(parseInt(etapa.ETAPA))) continue;

    try {
        const numero = parseInt(etapa.ETAPA);
        const tipo = mapTipoEtapa(etapa.ETAPA, etapa.TIPO);
        const recorrido = etapa.SALIDA_Y_META.trim();
        const kilometros = etapa.DISTANCIA.trim()    

           console.log('RECORRIDO:', etapa.SALIDA_Y_META);
            console.log('DISTANCIA:', etapa.DISTANCIA);

        const fechaXPartes = etapa.FECHA.split('. ')
        const fechaFormateada = fechaXPartes[1]
        const fechaISO = new Date(fechaFormateada.split('/').reverse().join('-'))

        await prisma.etapa.upsert({
            where: { numero },
            update: {
                tipo,
                fecha: fechaISO,
                recorrido,
                kilometros
            },
            create: {
                numero,
                tipo,
                fecha: fechaISO,
                recorrido,
                kilometros
            }
        })

    } catch (error) {
       console.error('Error al importar las etapas', error)
        } 
    }
    console.log('Importacion terminada')
 
}

importarEtapas()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
*/


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const etapasJson = require('../data/recorridoOficial.json');

// 🔄 Traducimos lo que viene en el JSON a las opciones reales de tu Enum de Prisma
const mapTipoEtapa = (tipoJson) => {
    if (!tipoJson) return 'EtapasDiarias';
    
    const tipoClean = tipoJson.toLowerCase().trim();

    if (tipoClean.includes('descanso')) {
        return 'Descanso';
    }
    
  
    return 'EtapasDiarias'; 
}

const importarEtapas = async() => {
    console.log(`Iniciando la carga de etapas adaptadas a tu Enum...`);

    for(const etapa of etapasJson) {
        if (!etapa.ETAPA || isNaN(parseInt(etapa.ETAPA))) continue;

        try {
            const numero = parseInt(etapa.ETAPA);
            const tipo = mapTipoEtapa(etapa.TIPO); // 👈 "EtapasDiarias" o "Descanso"
            const recorrido = etapa.SALIDA_Y_META ? etapa.SALIDA_Y_META.replace(/\s+/g, ' ').trim() : '';
            const kilometros = etapa.DISTANCIA ? etapa.DISTANCIA.trim() : '';

            // --- PROCESAMIENTO DE FECHA ---
            let fechaISO = new Date();
            if (etapa.FECHA && etapa.FECHA.includes('. ')) {
                const soloFecha = etapa.FECHA.split('. ')[1];
                const partes = soloFecha.split('/');
                fechaISO = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`);
            }

            console.log(`Subiendo Etapa 🏁 ${numero}: ${recorrido} [Tipo: ${tipo}]`);

            // Ahora sí le pasamos el tipo porque está validado con tu Enum
            await prisma.etapa.upsert({
                where: { numero },
                update: {
                    tipo,
                    fecha: fechaISO,
                    recorrido,
                    kilometros
                },
                create: {
                    numero,
                    tipo,
                    fecha: fechaISO,
                    recorrido,
                    kilometros
                }
            });

        } catch (error) {
            console.error(`❌ Error en la etapa número ${etapa.ETAPA}:`, error.message);
        } 
    }
    
    console.log('🏁 ¡Importación completa! Las 21 etapas están en tu base de datos de Neon.');
}

importarEtapas()
    .catch(e => console.error('Error crítico:', e))
    .finally(() => prisma.$disconnect());