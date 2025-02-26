// https://mockapi.io/

import axios from "axios"

// https://www.npmjs.com/package/axios
// npm i axios
// https://axios-http.com/


//const url = 'https://6626b1bfb625bf088c06652e.mockapi.io/api/productos/'
const url = 'http://localhost:8080/api/productos/'


//https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Proxy
//https://refactoring.guru/es/design-patterns/proxy
export const proxyProducto = producto => {
    //console.log(producto)
    const handler = {
        get(target, prop) {
            if(prop === 'id') prop = '_id'
            return target[prop]
        }
    }
    return new Proxy(producto, handler)
}

const eliminarPropiedad = (obj, prop) => {
    const objClon = {...obj}
    delete objClon[prop]
    return objClon
}


//const getAll = async () => (await axios.get(url)).data
/* const getAll = async () => {
    const productos = (await axios.get(url)).data
    console.log(productos)
    return productos
} */
/* const getAll = async () => {
    const productos = (await axios.get(url)).data
    console.log(productos)
    return productos.map(producto => proxyProducto(producto))
} */
const getAll = async () => (await axios.get(url)).data.map(producto => proxyProducto(producto))
const guardar = async prod => proxyProducto((await axios.post(url, prod)).data)
const actualizar = async (id, prod) => proxyProducto((await axios.put(url+id, eliminarPropiedad(prod, '_id'))).data)
const eliminar = async id => proxyProducto((await axios.delete(url+id)).data)

/* const getAll = async () => {
    const prods = await fetch(url).then(r => r.json())
    //prods.reverse()
    return prods
}

const guardar = async prod => await fetch(url, {
    method: 'POST',
    body: JSON.stringify(prod),
    headers: { 'content-type':'application/json' }
}).then(r => r.json())

const actualizar = async (id, prod) => await fetch(url+id, {
    method: 'PUT',
    body: JSON.stringify(prod),
    headers: { 'content-type':'application/json' }
}).then(r => r.json())

const eliminar = async id => await fetch(url+id, {
    method: 'DELETE'
}).then(r => r.json())
 */


/* ------------------------------------ */
/*             exportación              */
/* ------------------------------------ */
const servicioProductos = {
    getAll,
    guardar,
    actualizar,
    eliminar
}

export default servicioProductos