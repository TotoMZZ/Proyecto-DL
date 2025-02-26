import ModelFactory from "../modelo/DAOs/pedidos/pedidosFactory.js"

import config from "../config.js"

class Servicio {

    constructor() {
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA)
    }

    obtenerPedidos = async () => {
        const pedidos = await this.model.obtenerPedidos()
        return pedidos
    }

    guardarPedidos = async pedido => {
        const pedidoGuardado = await this.model.guardarPedido(pedido)
        return pedidoGuardado
    }
}

export default Servicio