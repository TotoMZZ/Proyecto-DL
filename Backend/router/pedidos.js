import express from 'express'

import Controlador from '../controlador/pedidos.js'


class Router {
    constructor(){
        this.controlador = new Controlador()
    }

    config() {
        const router = express.Router()

        router.get('/',  this.controlador.obtenerPedidos)
        router.post('/',  this.controlador.guardarPedido)

        return router
    }
}


export default Router