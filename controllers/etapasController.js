const prisma = require('../config/prismaBBDD')
const procesarEtapaService = require('../services/procesarEtapa')


const obtenerTodasLasEtapas = async(req, res) => {
    try {
        const etapas = await prisma.etapa.findMany()
        res.json(etapas)

    } catch (error) {
        console.error('No se pudo obtener la etapa')
        res.status(404).json({message: 'Error al intentar obtener la etapa'})
    }
}

const obtenerEtapaPorNumero = async(req,res) => {
    try {
        
        const numero = parseInt(req.params.numero);

        const etapa = await prisma.etapa.findUnique({where:{numero}})
        if(!etapa) {
            return res.status(404).json({message:'Etapa no encontrada'})
        }

        res.json(etapa);

    } catch (error) {
        console.error('No se pudo obtener etapa por numero ')
        res.status(404).json({message:'Error al intentar obtener etapa por numero'})
    }
}

const crearEtapa = async(req, res) => {
    try{
        const { numero, tipo, fecha, recorrido, kilometros } = req.body;

        if(!numero || typeof numero !== 'number') {
            return res.status(400).json({message: 'El numero de la etapa es obligatorio'})
        }

        if(!tipo || typeof tipo !== 'string') {
            return res.status(400).json({message: 'El tipo de etapa es obligatorio'})
        }

        const fechaValida = new Date(fecha)
        if(!fecha || isNaN(fechaValida.getTime())) {
            return res.status(400).json({message: 'La fecha de la etapa es obligatoria'})
        }

        const nuevaEtapa = await prisma.etapa.create({
            data: {
                numero,
                tipo,
                fecha: fechaValida,
                recorrido,
                kilometros
                
            }
        });

        res.status(201).json({ message: 'Etapa creada correctamente', etapa: nuevaEtapa });

    } catch(error) {
        console.error('No se pudo crear la etapa')
        res.status(500).json({message: 'Error al intentar crear la etapa'})
    }
}

const procesarEtapa = async(req, res) => {
    try {
        const { numeroEtapa, dorsales } = req.body;

        if(!numeroEtapa || !Array.isArray(dorsales)) {
            return res.status(400).json({message:'Datos inválidos'})
        }

        await procesarEtapaService(numeroEtapa, dorsales)
        res.status(200).json({message:`Etapa ${numeroEtapa} procesada correctamente`})

    } catch (error) {
        console.error('Error al procesar la etapa')
        res.status(500).json({message:`No se pudo procesar la etapa ${numeroEtapa}`})
    }
  }  

module.exports = {
    obtenerTodasLasEtapas, 
    obtenerEtapaPorNumero,
    crearEtapa,
    procesarEtapa
}