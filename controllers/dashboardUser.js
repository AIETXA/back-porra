const prisma = require('../config/prismaBBDD')

async function dashboardUser(req, res) {
    const userId = req.user.id

const misPorras = await prisma.porra.findMany({
  where: { userId },
  include: { corredores: true }
});

const ranking = await prisma.porra.findMany({
  orderBy: { puntosTotales: 'desc' },
  select: { id: true, nombre: true, puntosTotales: true, ranking: true }
});

const etapas = await prisma.etapa.findMany({
  orderBy: { numero: 'asc' },
  include: {
    resultados: {
      include: { corredor: true }
    }
  }
});
   return res.json({
      misPorras,
      ranking,
      etapas
    });
 
}

module.exports = dashboardUser

