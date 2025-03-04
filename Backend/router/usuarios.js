import express from 'express'

import Controlador from '../controlador/usuarios.js'

class Router {
    constructor() {
        this.router = express.Router()
        this.controlador = new Controlador()
    }

    config() {
        this.router.post('/login', this.controlador.loginUsuario)
        this.router.post('/register', this.controlador.registerUsuario)

        return this.router
    }
}

export default Router