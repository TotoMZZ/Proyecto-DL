import { useCallback, useEffect, useState } from 'react'
import { useStateLocalStorage } from '../../Hooks/useStateLocalStorage.js'
import servicioCarrito from '../../servicios/carrito.js'
import './Index.css'
import './pago.js'
import { Wallet } from '@mercadopago/sdk-react'
import { useNavigate } from 'react-router'
import { accionSetCantidad } from '../../state/actions.js'
import { useDispatch } from 'react-redux'

export function Index() {
    const [carrito, setCarrito] = useStateLocalStorage('carrito', [])
    const [pagar, setPagar] = useState(false)
    const [compraStatus, setCompraStatus] = useState({
        payment_id: 'null',
        status: 'null',
        merchant_order_id: 'null'
    })

    const dispatch = useDispatch()

    // -------------------------------------------------------------------------------------
    // Efecto para actualizar la cantidad de productos en el carrito de forma global (redux)
    useEffect(() => {
        ////console.log(carrito.length)
        const cantidad = carrito.length
        //console.log('--------------------------------')
        //console.log('1. DISPATCH -> Inicio', cantidad)
        dispatch(accionSetCantidad(cantidad))
    }, [carrito, dispatch])
    // -------------------------------------------------------------------------------------

    const navigate = useNavigate()

    const recibirDatosPago = async () => {
        const parameters = new URL(window.location.href.replace(/#\//g,''))
        ////console.log(parameters)

        const compra = {}
        compra.payment_id = parameters.searchParams.get('payment_id') || 'null'
        compra.status = parameters.searchParams.get('status') || 'null'
        compra.merchant_order_id = parameters.searchParams.get('merchant_order_id') || 'null'
        ////console.log(compra)

        if (compra.status !== 'null') {
            if (compra.status !== compraStatus.status) {
                setCompraStatus(compra)

                if (compra.status === 'approved') {
                    setCarrito([])
                    await new Promise(r => setTimeout(r, 2000))         //delay de 2000ms
                    navigate('/')

                }
            }

        }


    }

    const recibirDatosPagoCb = useCallback(recibirDatosPago, [recibirDatosPago])

    useEffect(() => {
        ////console.log('useEffect carrito')

        recibirDatosPagoCb()
    }, [recibirDatosPagoCb])

    ////console.log(...carrito)

    function decrementarItem(id) {
        ////console.log('decrementarItem', id)

        const carritoClon = [...carrito]
        const producto = carritoClon.find(p => p.id === id)

        if (producto.cantidad > 1) {
            producto.cantidad--
            setCarrito(carritoClon)
            setPagar(false)
        }
    }

    function incrementarItem(id) {
        ////console.log('incrementarItem', id)

        const carritoClon = [...carrito]
        const producto = carritoClon.find(p => p.id === id)

        if (producto.cantidad < producto.stock) {
            producto.cantidad++
            setCarrito(carritoClon)
            setPagar(false)

        }
    }

    function borrarItem(id) {
        ////console.log('borrarItem', id)

        if (window.confirm(`¿Está seguro de borrar el producto del carrito de nombre "${carrito.find(p => p.id === id)?.nombre}"?`)) {
            const carritoClon = [...carrito]
            const index = carritoClon.findIndex(p => p.id === id)
            carritoClon.splice(index, 1)
            setCarrito(carritoClon)
            setPagar(false)

        }
    }

    function borrarCarrito() {
        ////console.log('borrarCarrito')

        if (window.confirm(`¿Está seguro de borrar todo el carrito?`)) {
            setCarrito([])
            setPagar(false)

        }
    }

    /* async function generarPedido() {
        ////console.log('generarPedido')

        const pedido = { pedido: carrito }

        ////console.log('Enviar pedido...')
        await servicioCarrito.enviar(pedido)
        ////console.log('Pedido recibido!')

        setCarrito([])
    } */

    //------------ Control de boton de pago ------------

    const customization = {
        texts: {
            action: 'pay',
            valueProp: 'security_details',
        },
        visual: {
            buttonBackground: 'black',
            borderRadius: '6px',
        },
    }

    const onReady = () => {
        ////console.log('onReady')
    }

    const onError = () => {
        ////console.log('onError')
    }

    const onSubmit = () => {
        console.error('onSubmit')

        //return Promise.resolve('1798944430-e3391bf3-24d8-4c94-9952-8e3e3fc955bd')
        return new Promise((resolve, reject) => {
            //resolve('1798944430-e3391bf3-24d8-4c94-9952-8e3e3fc955bd')
            servicioCarrito.getPreferenceId(carrito)
                .then(preferenceId => resolve(preferenceId))
                .catch(error => reject(error))
        })
    }

    //------------------------------------------------------ 

    return (
        <div className="carrito">
            <div className="h2">
                <h2>Carrito de Compras</h2>
            </div>
            <br /><br />

            {/* ------- Cartel del resultado de la operacion de pago ------- */}
            {compraStatus.status !== 'null' &&
                <div style={{
                    backgroundColor: compraStatus.status === 'approved' ? 'lightgreen' : 'lightpink',
                    width: '50%',
                    margin: '0 auto',
                    padding: '10px',
                    borderRadius: '20px'
                }}>
                    <h3 style={{ textAlign: 'center' }}>Estado de compra</h3>
                    <hr />
                    <ul>
                        <li><h4>payment_id: {compraStatus.payment_id}</h4></li>
                        <li><h4>status: {compraStatus.status}</h4></li>
                        <li><h4>merchant_order_id: {compraStatus.merchant_order_id}</h4></li>
                    </ul>
                </div>
            }

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
                                <th>subtotal</th>
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
                                        <td className="centrar">${producto.precio * producto.cantidad}</td>
                                        <td>
                                            <button id={"btnBorrar-" + producto.id} onClick={
                                                () => borrarItem(producto.id)
                                            }>Borrar</button>
                                        </td>
                                    </tr>
                                )
                            }
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th><h3>TOTAL</h3></th>
                                <th><h3>{carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0)}</h3></th>
                                <th></th>

                            </tr>
                        </tbody>

                    </table>

                    {!pagar
                        ? < button className="carrito__borrar__pedir carrito__pedir" onClick={
                            //() => generarPedido()
                            () => setPagar(true)
                        }>Pagar</button>

                        : <div id="wallet_container">

                            <Wallet
                                customization={customization}
                                onReady={onReady}
                                onError={onError}
                                onSubmit={onSubmit}
                            />

                        </div>
                    }

                </>
            }
            {!carrito.length && <h2>No se encontraron pedidos para mostrar</h2>}
        </div >
    )
}



/* 
--------------------------------------------------------------------------------------------------

Tarjeta         	        Número	            Código de seguridad	        Fecha de caducidad

Mastercard              5031 7557 3453 0604             123                     11/30
Visa                    4509 9535 6623 3704             123                     11/30
American Express        3711 8030 3257 522              1234                    11/30
Mastercard Debito       5287 3383 1025 3304             123                     11/30
Visa Debito             4002 7686 9439 5619             123                     11/30

--------------------------------------------------------------------------------------------------

Estado de pago	                Descripción	                        Documento de identidad

APRO                            Pago aprobado                       (DNI) 12345678
OTHE                     Rechazado por error general                (DNI) 12345678
CONT                        Pendiente de pago                               -
CALL                Rechazado con validación para autorizar                 -
FUND                Rechazado por importe insuficiente                      -
SECU            Rechazado por código de seguridad inválido                  -
EXPI        Rechazado debido a un problema de fecha de vencimiento          -
FORM            Rechazado debido a un error de formulario                   -

--------------------------------------------------------------------------------------------------
*/