import ModelFactory from "../modelo/DAOs/pedidos/pedidosFactory.js"

import config from "../config.js"

import './pago.js'
import { preference } from "./pago.js"

class Servicio {

    constructor() {
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA)
    }

    obtenerPedidos = async () => {
        const pedidos = await this.model.obtenerPedidos()
        return pedidos
    }

    /* guardarPedidos = async pedido => {
        const pedidoGuardado = await this.model.guardarPedido(pedido)
        return pedidoGuardado
    } */

    createPreference = async datos => {
        try {
            this.carrito = datos.carrito
            this.fyhPedido = datos.fyh
            const preferences = await preference.create(datos.prefItems)
            return preferences.id
        } 
        catch (error) {
            console.log(`Error en CreatePreference: ${error.message}`)
        }
    }

    feedback = async result => {
        const { payment_id, status, merchant_order_id } = result

        if(status == 'approved'){
            const datos = { compra: result, pedido: this.carrito, fyhPedido: this.fyhPedido, fyhCompra: new Date().toLocaleString() }
            await this.model.guardarPedido(datos)

        }

        return `http://localhost:3000/carrito?payment_id=${payment_id}&status=${status}&merchant_order_id=${merchant_order_id}`
    }

}

export default Servicio