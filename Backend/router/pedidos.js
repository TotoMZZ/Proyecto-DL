import express from 'express'

import Controlador from '../controlador/pedidos.js'


class Router {
    constructor(){
        this.controlador = new Controlador()
    }

    config() {
        const router = express.Router()

        router.get('/',  this.controlador.obtenerPedidos)
        //router.post('/',  this.controlador.guardarPedido)
        router.post('/mp/create_preference', this.controlador.createPreference)
        router.get('/mp/feedback', this.controlador.feedback)

        return router 
    }
}


export default Router