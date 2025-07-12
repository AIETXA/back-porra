import fs from 'fs';
import csv from 'csv-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function guardarCorredores(corredores) {
  for (const corredor of corredores) {
    await prisma.corredor.create({
      data: {
        nombre: corredor.nombre,
        dorsal: Number(corredor.dorsal),
        equipo: corredor.equipo,
      },
    });
  }
  console.log('¡Datos guardados!');
}

async function main() {
  const corredores = [];

  fs.createReadStream('./datos/corredores.csv')
    .pipe(csv())
    .on('data', (row) => {
      corredores.push(row);
    })
    .on('end', async () => {
      console.log('CSV leído correctamente');
      await guardarCorredores(corredores);
      await prisma.$disconnect();
    });
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
