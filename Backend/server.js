import express from 'express'


import RouterProductos from './router/productos.js'
import RouterPedidos from './router/pedidos.js'
import RouterUpload from './router/upload.js'


import config from './config.js'


import cors from 'cors'

class Server {

    start() {
        const app = express()
        app.use(cors())

        app.use(express.static('public'))

        app.use(express.json())

        //--------- Rutas / endpoints API RESTful ------
        app.use('/api/productos', new RouterProductos().config())
        app.use('/api/pedidos', new RouterPedidos().config())
        app.use('/api/upload', new RouterUpload().config())

        //------------ Listen del servidor Express ------------
        const PORT = config.PORT
        const server = app.listen(PORT, () => console.log(`Servidor ApiRESTful escuchando en http://localhost:${PORT}`))
        server.on('error', error => console.log(`Error en servidor: ${error.message}`))
    }
}

export default Server