
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const etapasJson = require('../data/recorridoOficial.json')

const mapTipoEtapa = (numeroEtapa) => {
    if(numeroEtapa === 20) return 'FinalMontaña'
    if(numeroEtapa === 21) return 'FinalGeneral'

    return 'EtapasDiarias'
}

const importarEtapas = async() => {
   for(const etapa of etapasJson) {
        if(etapa.ETAPA === '-') continue

    try {
        const numero = parseInt(etapa.ETAPA);
        const tipo = mapTipoEtapa(numero)    

        const fechaXPartes = etapa.FECHA.split('. ')
        const fechaFormateada = fechaXPartes[1]
        const fechaISO = new Date(fechaFormateada.split('/').reverse().join('-'))

        await prisma.etapa.create({
            data: {
                numero,
                tipo,
                fecha: fechaISO
            }
        })

    } catch (error) {
       console.error('Error al importar las etapas')
        } 
    }
    console.log('Importacion terminada')
}

importarEtapas()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
