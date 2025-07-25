
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function reordenarEtapas() {
  try {
    // Obtener todas las etapas ordenadas por fecha ascendente
    const etapas = await prisma.etapa.findMany({
      orderBy: { fecha: 'asc' },
    });

    // Recorrer y reasignar números en orden
    for (let i = 0; i < etapas.length; i++) {
      const etapa = etapas[i];
      const nuevoNumero = i + 1;
      
      // Actualizar solo si el número es distinto
      if (etapa.numero !== nuevoNumero) {
        await prisma.etapa.update({
          where: { id: etapa.id },
          data: { numero: nuevoNumero },
        });
        console.log(`Etapa ID ${etapa.id} número actualizado a ${nuevoNumero}`);
      }
    }

    console.log('Reordenamiento completado.');
  } catch (error) {
    console.error('Error reordenando etapas:', error);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = reordenarEtapas();
