import { useEffect, useState } from 'react'
import './Index.css'
import servicioProductos from '../../servicios/productos.js'
import { ObtenerFoto } from './ObtenerFoto.js'

export function Index() {
    const prodClear = {
        nombre: '',
        precio: '',
        stock: '',
        marca: '',
        categoria: '',
        descripcionCorta: '',
        descripcionLarga: '',
        edadDesde: '',
        edadHasta: '',
        foto: '',
        envio: false
    }

    const [productos, setProductos] = useState([])
    const [producto, setProducto] = useState(prodClear)
    const [editarID, setEditarID] = useState(null)

    useEffect(() => {
        //console.log('Componente Alta (montado)')

        async function pedir() {
            const productos = await servicioProductos.getAll()
            //console.log(productos)
            setProductos(productos)
        }
        pedir()
        //escribirCampoFoto('hola!!!')

        return () => {
            //console.log('Componente Alta (desmontado)')
        }
    }, [])


    async function agregar(e) {
        e.preventDefault()

        //console.log('agregar', producto)

        if (editarID) {
            // guardamos el producto en el recurso remoto
            const productActualizado = await servicioProductos.actualizar(editarID, producto)
            //console.log(productActualizado)

            // actualización del producto en el recurso local
            const productosClon = [...productos]
            const index = productosClon.findIndex(p => p.id === productActualizado.id)
            productosClon.splice(index, 1, productActualizado)
            setProductos(productosClon)

            setEditarID(null)
        }
        else {
            // guardamos el producto en el recurso remoto
            const productoGuardado = await servicioProductos.guardar(producto)

            // guardamos el producto en el recurso local
            const productosClon = [...productos]
            productosClon.push(productoGuardado)
            setProductos(productosClon)
        }

        // borro el formulario
        setProducto(prodClear)
    }

    // ------------------------------------------------------
    // control de los botones de borrar
    const borrar = async id => {
        //console.log('borrar', id)

        //if (window.confirm(`¿Está seguro de borrar el producto de id ${id}?`)) {
        if (window.confirm(`¿Está seguro de borrar el producto de nombre "${productos.find(p => p.id === id)?.nombre}"?`)) {
            // borramos el producto en el recurso remoto
            const productoBorrado = await servicioProductos.eliminar(id)

            // borramos el producto en el recurso local
            const productosClon = [...productos]
            const index = productosClon.findIndex(p => p.id === productoBorrado.id)
            productosClon.splice(index, 1)
            setProductos(productosClon)
        }
    }

    // ------------------------------------------------------
    // control de los botones de edición
    const editar = id => {
        //console.log('editar', id)

        setEditarID(id)

        const producto = productos.find(p => p.id === id)
        setProducto(producto)
    }

    // ------------------------------------------------------
    // control de los botones de cancelar
    const cancelar = () => {
        //console.log('cancelar')

        setEditarID(null)

        // borro el formulario
        setProducto(prodClear)
    }

    function formularioValido() {
        const { nombre, precio, stock, marca, categoria, descripcionCorta, descripcionLarga, edadDesde, edadHasta} = producto

        return (
            nombre &&
            precio &&
            stock &&
            marca &&
            categoria &&
            descripcionCorta &&
            descripcionLarga &&
            edadDesde &&
            edadHasta
        )
    }


    const escribirCampoFoto = url => {
        const productoClon = { ...producto}
        productoClon.foto = url
        setProducto(productoClon)
    }

    return (
        <div className="alta">
            <div className="h2">
                <h2>Alta de Productos</h2>
            </div>
            <form className="alta-form" onSubmit={agregar}>
                <div className="form-group">
                    <div className="group1">
                        {/* <!-- campo nombre --> */}
                        <div className="input-group">
                            <label htmlFor="nombre">nombre</label>
                            <input id="nombre" type="text" name="nombre" value={producto.nombre} onChange={
                                e => setProducto({ ...producto, nombre: e.target.value })
                            } />
                            <div className="error-detail"></div>
                        </div>

                        {/* <!-- campo precio --> */}
                        <div className="input-group">
                            <label htmlFor="precio">precio</label>
                            <input id="precio" type="number" name="precio" value={producto.precio} onChange={
                                e => setProducto({ ...producto, precio: e.target.value ? +e.target.value : '' })
                            } />
                            <div className="error-detail"></div>
                        </div>

                        {/* <!-- campo stock --> */}
                        <div className="input-group">
                            <label htmlFor="stock">stock</label>
                            <input id="stock" type="number" name="stock" value={producto.stock} onChange={
                                e => setProducto({ ...producto, stock: e.target.value ? parseInt(e.target.value) : '' })
                            } />
                            <div className="error-detail"></div>
                        </div>

                        {/* <!-- campo marca --> */}
                        <div className="input-group">
                            <label htmlFor="marca">marca</label>
                            <input id="marca" type="text" name="marca" value={producto.marca} onChange={
                                e => setProducto({ ...producto, marca: e.target.value })
                            } />
                            <div className="error-detail"></div>
                        </div>

                        {/* <!-- campo categoría --> */}
                        <div className="input-group">
                            <label htmlFor="categoria">categoría</label>
                            <input id="categoria" type="text" name="categoria" value={producto.categoria} onChange={
                                e => setProducto({ ...producto, categoria: e.target.value })
                            } />
                            <div className="error-detail"></div>
                        </div>
                    </div>

                    <div className="group2">
                        {/* <!-- campo detalles --> */}
                        <div className="input-group">
                            <label htmlFor="descripcionCorta">descripcion corta</label>
                            <input id="descripcionCorta" type="text" name="descripcionCorta" value={producto.descripcionCorta} onChange={
                                e => setProducto({ ...producto, descripcionCorta: e.target.value })
                            } />
                            <div className="error-detail"></div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="descripcionLarga">descripcion larga</label>
                            <input id="descripcionLarga" type="text" name="descripcionLarga" value={producto.descripcionLarga} onChange={
                                e => setProducto({ ...producto, descripcionLarga: e.target.value })
                            } />
                            <div className="error-detail"></div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="edadDesde">edad desde</label>
                            <input id="edadDesde" type="number" name="edadDesde" value={producto.edadDesde} onChange={
                                e => setProducto({ ...producto, edadDesde: e.target.value })
                            } />
                            <div className="error-detail"></div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="edadHasta">edad hasta</label>
                            <input id="edadHasta" type="number" name="edadHasta" value={producto.edadHasta} onChange={
                                e => setProducto({ ...producto, edadHasta: e.target.value })
                            } />
                            <div className="error-detail"></div>
                        </div>

                        {/* <!-- campo foto --> */}
                        <div className="input-group">
                            <label htmlFor="foto">foto</label>
                            <input id="foto" type="text" name="foto" value={producto.foto} onChange={
                                e => setProducto({ ...producto, foto: e.target.value })
                            } />
                            {/* Zona de obtencion de la foto del producto */}
                            <ObtenerFoto escribirCampoFoto={escribirCampoFoto}/>
                            
                            <div className="error-detail"></div>
                        </div>
                    </div>
                </div>
                {/* <!-- campo envío --> */}
                <div className="container-checkbox">
                    <div className="input-group checkbox">
                        <input id="envio" type="checkbox" name="envio" checked={producto.envio} onChange={
                            e => setProducto({ ...producto, envio: e.target.checked })
                        } />
                        <label htmlFor="envio">envío</label>
                    </div>
                </div>
                <button disabled={!formularioValido()} className={editarID ? "btnActualizar" : "btnAgregar"}>
                    {editarID ? 'Actualizar' : 'Agregar'}
                </button>

            </form>

            <hr />

            <div className="h2">
                <h2>Lista de productos disponibles</h2>
            </div>

            {productos.length > 0
                ? <table>
                    <thead>
                        <tr>
                            {/* <th>#</th> */}
                            <th>nombre</th>
                            <th>precio</th>
                            <th>stock</th>
                            <th>marca</th>
                            <th>categoría</th>
                            <th>descripcion corta</th>
                            <th>descripcion larga</th>
                            <th>edad desde</th>
                            <th>edad hasta</th>
                            <th>foto</th>
                            <th>envío</th>
                            <th>acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productos.map((producto, i) =>
                                <tr key={i}>
                                    {/* <td className="centrar">{producto.id}</td> */}
                                    <td>{producto.nombre}</td>
                                    <td className="centrar">${producto.precio}</td>
                                    <td className="centrar">{producto.stock}</td>
                                    <td>{producto.marca}</td>
                                    <td>{producto.categoria}</td>
                                    <td>{producto.descripcionCorta}</td>
                                    <td>{producto.descripcionLarga}</td>
                                    <td className="centrar">{producto.edadDesde}</td>
                                    <td className="centrar">{producto.edadHasta}</td>
                                    <td><img width="75" src={producto.foto} alt={"foto de " + producto.nombre + ' ' + producto.marca} /></td>
                                    <td className="centrar">{producto.envio ? 'Si' : 'No'}</td>
                                    <td>
                                        {/* Botón borrar */}
                                        <button disabled={editarID ? true : false} className="borrar-editar" id={"btnBorrar-" + producto.id} onClick={
                                            () => borrar(producto.id)
                                        }>Borrar</button>

                                        {/* Botón editar */}
                                        {editarID && editarID === producto.id
                                            ? <button className="borrar-editar" id={"btnCancelar-" + producto.id} onClick={
                                                () => cancelar()
                                            }>Cancelar</button>
                                            : <button className="borrar-editar" id={"btnEditar-" + producto.id} onClick={
                                                () => editar(producto.id)
                                            }>Editar</button>
                                        }
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>

                </table>
                : <h2>No se encontraron productos para mostrar</h2>
            }
        </div>
    )
}