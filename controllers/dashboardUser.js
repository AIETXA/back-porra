const prisma = require('../config/prismaBBDD')

async function dashboardUser(req, res) {
    const userId = req.user.userId

const misPorras = await prisma.porra.findMany({
  where: { userId: userId  },
  include: {
    corredores: {
      include: {
        corredor: true  
      }
    },
    user: true,     
  
  }
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

module.exports = { dashboardUser }

