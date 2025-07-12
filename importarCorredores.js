const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  const rawData = fs.readFileSync('./listaParticipantesTour.json', 'utf8');
  const datos = JSON.parse(rawData);

  for (const corredor of datos) {
    const nombreCompleto = corredor.Nombre.trim();
    const [nombre, ...resto] = nombreCompleto.split(' ');
    const apellido = resto.join(' ');
    const dorsal = parseInt(corredor.Dorsal);
    const url = corredor.Perfil;

    await prisma.corredor.create({
      data: {
        nombre,
        apellido,
        dorsal,
        equipo: '',
        pais: '',
        url
      }
    });
  }

  console.log('✅ Corredores importados correctamente');
}

main()
  .catch((e) => {
    console.error('❌ Error al importar:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
