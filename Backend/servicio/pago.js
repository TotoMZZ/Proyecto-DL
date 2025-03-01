// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';
import config from '../config.js ';
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: config.MP_AccesToken });


export const preference = new Preference(client);

/* preference.create({
    body: {
        items: [
            {
                title: 'Mi producto 2',
                quantity: 1,
                unit_price: 3500
            }
        ],
        back_urls: {
            success: "http://localhost:3000/carrito",
            failure: "http://localhost:3000/carrito",
            pending: "http://localhost:3000/carrito",
        },
        auto_return: "approved"
    }
})
.then(console.log)
.catch(console.log);
 */

