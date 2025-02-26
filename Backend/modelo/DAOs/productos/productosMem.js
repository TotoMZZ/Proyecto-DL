class ModelMem {

    constructor() {
        this.productos = [
            {
                nombre: "we",
                precio: 474,
                stock: 49,
                marca: "Jewelery",
                categoria: "Bespoke Rubber Fish",
                descripcionCorta: "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
                descripcionLarga: "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
                edadDesde: 27,
                edadHasta: 30,
                envio: false,
                foto: "https://loremflickr.com/640/480/sports",
                id: "1"
            },
            {
                nombre: "Keyboard",
                precio: "959.00",
                stock: 25,
                marca: "Industrial",
                categoria: "Generic Frozen Bacon",
                descripcionCorta: "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
                descripcionLarga: "The Football Is Good For Training And Recreational Purposes",
                edadDesde: 29,
                edadHasta: 99,
                envio: false,
                foto: "https://loremflickr.com/640/480/abstract",
                id: "2"
            },
            {
                nombre: "Shoes",
                precio: "855.00",
                stock: 1,
                marca: "Music",
                categoria: "Sleek Cotton Sausages",
                descripcionCorta: "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
                descripcionLarga: "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
                edadDesde: 55,
                edadHasta: 64,
                envio: false,
                foto: "https://loremflickr.com/640/480/technics",
                id: "3"
            }
        ]
    }

    obtenerProductos = async () => this.productos

    obtenerProducto = async id => {
        const producto = this.productos.find(p => p.id === id)
        return producto || {}
    }

    guardarProducto = async producto => {
        producto.id = String(+(this.productos[this.productos.length - 1]?.id || 0) + 1)
        this.productos.push(producto)
        return producto
    }

    actualizarProducto = async (id, producto) => {
        producto.id = id

        const index = this.productos.findIndex(p => p.id === id)
        const productoAnt = this.productos.find(p => p.id === id)
        const productoNuevo = { ...productoAnt, ...producto }
        this.productos.splice(index, 1, productoNuevo)
        return productoNuevo
    }

    borrarProducto = async id => {
        let productoEliminado = {}
        const index = this.productos.findIndex(p => p.id === id)
        if (index != -1) {
            productoEliminado = this.productos.splice(index, 1)[0]
        }
        return productoEliminado
    }
}
export default ModelMem