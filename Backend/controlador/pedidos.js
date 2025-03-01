import Servicio from '../servicio/pedidos.js'


class Controlador {
    constructor() {
        this.servicio = new Servicio()
    }

    obtenerPedidos = async (req, res) => {
        try {
            const pedidos = await this.servicio.obtenerPedidos()
            res.json(pedidos)
        }
        catch (error) {
            res.status(500).json({ errMsg: error.message })
        }
    }

    /* guardarPedido = async (req, res) => {
        try {
            const pedido = req.body
            const pedidoGuardado = await this.servicio.guardarPedidos(pedido)
            res.json(pedidoGuardado)
        }
        catch (error) {
            res.status(500).json({ errMsg: error.message })
        }
    } */

    createPreference = async (req, res) => {
        try {
            const datos = req.body
            const preferenceId = await this.servicio.createPreference(datos)
            res.json(preferenceId)
        }
        catch (error) {
            res.status(500).json({ errMsg: error.message })
        }
    }

    feedback = async (req, res) => {
        const result = req.query
        //console.log(result)
        const urlRetorno = await this.servicio.feedback(result)
        
        //res.json({result})
        res.redirect(urlRetorno)
        
    }
}

export default Controlador
