import axios from "axios"

//const url = 'https://6626b1bfb625bf088c06652e.mockapi.io/api/pedidos/'
const url = 'http://localhost:8080/api/pedidos/'



const enviar = async pedido => (await axios.post(url, pedido)).data

/* const enviar = async pedido => await fetch(url, {
    method: 'POST',
    body: JSON.stringify(pedido),
    headers: { 'content-type':'application/json' }
}).then(r => r.json()) */


/* ------------------------------- */
/*           Exportación           */
/* ------------------------------- */
const servicioCarrito = {
    enviar
}

export default servicioCarrito
