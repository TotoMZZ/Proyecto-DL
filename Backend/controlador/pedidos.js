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

    guardarPedido = async (req, res) => {
        try {
            const pedido = req.body
            const pedidoGuardado = await this.servicio.guardarPedidos(pedido)
            res.json(pedidoGuardado)
        }
        catch (error) {
            res.status(500).json({ errMsg: error.message })
        }
    }
}

export default Controlador
