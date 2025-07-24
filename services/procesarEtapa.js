const cargarResultados = require('./resultadoEtapa');
const { calcularPuntosPorraPorEtapa, calcularRanking } = require('./actualizarPuntos')


async function procesarEtapa(numeroEtapa, dorsales) {
    try {
        await cargarResultados(numeroEtapa, dorsales);
        await calcularPuntosPorraPorEtapa(numeroEtapa, dorsales);
        await calcularRanking();
        console.log(`Etapa ${numeroEtapa} procesada con exito`)
    } catch(error) {
        console.error('Error al procesar la etapa', error)
    }
}

module.exports = procesarEtapa; 