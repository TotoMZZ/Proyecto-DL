import axios from "axios"

//const url = 'https://6626b1bfb625bf088c06652e.mockapi.io/api/pedidos/'
const url = 'http://localhost:8080/api/pedidos/'



//const enviar = async pedido => (await axios.post(url, pedido)).data

/* const enviar = async pedido => await fetch(url, {
    method: 'POST',
    body: JSON.stringify(pedido),
    headers: { 'content-type':'application/json' }
}).then(r => r.json()) */


export async function getPreferenceId(carrito) {
    const prefItems = {
        body: {
            items: carrito.map(p => ({
                title: p.nombre,
                quantity: parseInt(p.cantidad),
                unit_price: +p.precio

            }))
            
            /* [
                {
                    title: 'Mi producto 1',
                    quantity: 1,
                    unit_price: 7777
                }
            ] */,
            back_urls: {
                success: url + "mp/feedback",
                failure: url + "mp/feedback",
                pending: url + "mp/feedback",
            },
            auto_return: "approved"
        }
    }

    const datos = { prefItems, carrito, fyh: new Date().toLocaleString() }

    const {data:preferenceId} = await axios.post(url + 'mp/create_preference', datos)
    return preferenceId
}


/* ------------------------------- */
/*           Exportación           */
/* ------------------------------- */
const servicioCarrito = {
    //enviar
    getPreferenceId
}

export default servicioCarrito
