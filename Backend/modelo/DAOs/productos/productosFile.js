import fs from 'fs'

class ModelFile {

    constructor() {
        this.nombreArchivo = 'productos.json'
    }

    leerArchivo = async () => {
        let productos = []
        try {
            productos = JSON.parse(await fs.promises.readFile(this.nombreArchivo, 'utf-8'))
            return productos
        }
        catch {}

        return productos
    }

    escribirArchivo = async productos => {
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos, null, '\t'))
    }


    obtenerProductos = async () => {
        const productos = await this.leerArchivo()
        return productos
    }

    obtenerProducto = async id => {
        const productos = await this.leerArchivo()
        const producto = productos.find(p => p.id === id)
        return producto || {}
    }

    guardarProducto = async producto => {
        const productos = await this.leerArchivo()

        producto.id = String(+(productos[productos.length - 1]?.id || 0) + 1)
        productos.push(producto)

        await this.escribirArchivo(productos)

        return producto
    }

    actualizarProducto = async (id, producto) => {
        const productos = await this.leerArchivo()

        producto.id = id

        const index = productos.findIndex(p => p.id === id)
        const productoAnt = productos.find(p => p.id === id)
        const productoNuevo = { ...productoAnt, ...producto }
        productos.splice(index, 1, productoNuevo)

        await this.escribirArchivo(productos)

        return productoNuevo
    }

    borrarProducto = async id => {
        const productos = await this.leerArchivo()

        let productoEliminado = {}
        const index = productos.findIndex(p => p.id === id)
        if (index != -1) {
            productoEliminado = productos.splice(index, 1)[0]
            await this.escribirArchivo(productos)
        }
        return productoEliminado
    }
}
export default ModelFile