import { useStateLocalStorage } from '../../Hooks/useStateLocalStorage.js'
import servicioCarrito from '../../servicios/carrito.js'

import './Index.css'

export function Index() {
    const [carrito, setCarrito] = useStateLocalStorage('carrito', [])
    console.log(...carrito)

    function decrementarItem(id) {
        console.log('decrementarItem', id)

        const carritoClon = [...carrito]
        const producto = carritoClon.find(p => p.id === id)

        if (producto.cantidad > 1) {
            producto.cantidad--
            setCarrito(carritoClon)
        }
    }

    function incrementarItem(id) {
        console.log('incrementarItem', id)

        const carritoClon = [...carrito]
        const producto = carritoClon.find(p => p.id === id)

        if (producto.cantidad < producto.stock) {
            producto.cantidad++
            setCarrito(carritoClon)
        }
    }

    function borrarItem(id) {
        console.log('borrarItem', id)

        if (window.confirm(`¿Está seguro de borrar el producto del carrito de nombre "${carrito.find(p => p.id === id)?.nombre}"?`)) {
            const carritoClon = [...carrito]
            const index = carritoClon.findIndex(p => p.id === id)
            carritoClon.splice(index, 1)
            setCarrito(carritoClon)
        }
    }

    function borrarCarrito() {
        console.log('borrarCarrito')

        if (window.confirm(`¿Está seguro de borrar todo el carrito?`)) {
            setCarrito([])
        }
    }

    async function generarPedido() {
        console.log('generarPedido')

        const pedido = { pedido: carrito }

        console.log('Enviar pedido...')
        await servicioCarrito.enviar(pedido)
        console.log('Pedido recibido!')

        setCarrito([])
    }

    return (
        <div className="carrito">
            <div className="h2">
                <h2>Carrito de Compras</h2>
            </div>
            <br /><br />
            {carrito.length > 0 &&
                <>
                    <button className="carrito__borrar__pedir carrito__borrar" onClick={
                        () => borrarCarrito()
                    }>Borrar</button>
                    <table>
                        <thead>
                            <tr>
                                {/* <th>#</th> */}
                                <th>nombre</th>
                                <th>precio</th>
                                <th>marca</th>
                                <th>foto</th>
                                <th>cantidad</th>
                                <th>acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                carrito.map((producto, i) =>
                                    <tr key={i}>
                                        {/* <td className="centrar">{producto.id}</td> */}
                                        <td>{producto.nombre}</td>
                                        <td className="centrar">${producto.precio}</td>
                                        <td>{producto.marca}</td>
                                        <td><img width="150" src={producto.foto} alt={"foto de " + producto.nombre + ' ' + producto.marca} /></td>
                                        <td className="centrar">
                                            {producto.cantidad}
                                            {/* Botón incrementar */}
                                            <button className="btnIncDec" id={"btnIncrementar-" + producto.id} onClick={
                                                () => incrementarItem(producto.id)
                                            }>+</button>
                                            {/* Botón decrementar */}
                                            <button className="btnIncDec" id={"btnDecrementar-" + producto.id} onClick={
                                                () => decrementarItem(producto.id)
                                            }>-</button>
                                        </td>
                                        <td>
                                            <button id={"btnBorrar-" + producto.id} onClick={
                                                () => borrarItem(producto.id)
                                            }>Borrar</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                    <button className="carrito__borrar__pedir carrito__pedir" onClick={
                        () => generarPedido()
                    }>Pedir</button>
                </>
            }
            {!carrito.length && <h2>No se encontraron pedidos para mostrar</h2>}
        </div>
    )
}