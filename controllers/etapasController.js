const prisma = require('../config/prismaBBDD')



const obtenerTodasLasEtapas = async(req, res) => {
    try {
        const etapas = await prisma.etapa.findMany()
        res.json(etapas)

    } catch (error) {
        console.error('No se pudo obtener la etapa')
        res.status(404).send({message: 'Error al intentar obtener la etapa'})
    }
}

const obtenerEtapaPorNumero = async(req,res) => {
    try {
        
        const numero = parseInt(req.params.numero);

        const etapa = await prisma.etapa.findUnique({where:{numero}})
        if(!etapa) {
            return res.status(404).send({message:'Etapa no encontrada'})
        }

        res.json(etapa);

    } catch (error) {
        console.error('No se pudo obtener etapa por numero ')
        res.status(404).send({message:'Error al intentar obtener etapa por numero'})
    }
}

const crearEtapa = async(req, res) => {
    try{
        const { numero, tipo, fecha, recorrido, kilometros } = req.body;

        if(!numero || typeof numero !== 'number') {
            return res.status(400).send({message: 'El numero de la etapa es obligatorio'})
        }

        if(!tipo || typeof tipo !== 'string') {
            return res.status(400).send({message: 'El tipo de etapa es obligatorio'})
        }

        const fechaValida = new Date(fecha)
        if(!fecha || isNaN(fechaValida.getTime())) {
            return res.status(400).send({message: 'La fecha de la etapa es obligatoria'})
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

        res.status(201).send({ message: 'Etapa creada correctamente', etapa: nuevaEtapa });

    } catch(error) {
        console.error('No se pudo crear la etapa')
        res.status(500).send({message: 'Error al intentar crear la etapa'})
    }
}
module.exports = {
    obtenerTodasLasEtapas, 
    obtenerEtapaPorNumero,
    crearEtapa
}