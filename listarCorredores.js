import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function listarCorredores() {
  const corredores = await prisma.corredor.findMany();
  console.log('Corredores en la base:', corredores);
  await prisma.$disconnect();
}

listarCorredores().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
