import Servicio from '../servicio/productos.js'


class Controlador {
    constructor() {
        this.servicio = new Servicio()
    }

    obtenerProducto = async (req, res) => {
        try {
            const { id } = req.params
            const productos = await this.servicio.obtenerProducto(id)
            res.json(productos)
        }
        catch (error) {
            res.status(500).json({ errMsg: error.message })
        }
    }

    guardarProducto = async (req, res) => {
        try {
            const producto = req.body
            const productoGuardado = await this.servicio.guardarProducto(producto)
            res.json(productoGuardado)
        }
        catch (error) {
            res.status(500).json({ errMsg: error.message })
        }
    }

    actualizarProducto = async (req, res) => {
        try {

            const { id } = req.params
            const producto = req.body
            const productoActualizado = await this.servicio.actualizarProducto(id, producto)
            res.json(productoActualizado)
        }
        catch (error) {
            res.status(500).json({ errMsg: error.message })
        }
    }

    borrarProducto = async (req, res) => {
        try {

            const { id } = req.params
            const productoEliminado = await this.servicio.borrarProducto(id)
            res.json(productoEliminado)
        }
        catch (error) {
            res.status(500).json({ errMsg: error.message })
        }
    }
}

export default Controlador
