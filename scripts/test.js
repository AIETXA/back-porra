import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function test() {
  const porras = await prisma.porra.findMany({
    select: {
      id: true,
      nombre: true,
      puntosTotales: true,
      ranking: true,
    }
  });
  console.log(porras);
}

test()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
