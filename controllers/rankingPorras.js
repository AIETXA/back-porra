const prisma = require('../config/prismaBBDD')

const obtenerRankingPorra = async (req, res) => {
  try {
   const ranking = await prisma.porra.findMany({
      orderBy: { puntosTotales: 'desc' },
      select: {
        id: true,
        nombre: true,
        puntosTotales: true,
        ranking: true
      }
    });

    res.json(ranking);
  } catch (error) {
    console.error('Error al obtener ranking:', error);
    res.status(500).json({ message: 'Error al obtener ranking' });
  }
};

module.exports = {obtenerRankingPorra}
