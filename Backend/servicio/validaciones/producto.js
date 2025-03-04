//https://www.npmjs.com/package/joi
//https://joi.dev/

import Joi from 'joi'

const validar = producto => {
    const productoSchema = Joi.object({
        nombre: Joi.string().min(2).max(20).required(),
        precio: Joi.number().required(),
        stock: Joi.number().required(),
        marca: Joi.string().required(),
        categoria: Joi.string().required(),
        detalles: Joi.string().required(),
        foto: Joi.string().required(),
        envio: Joi.boolean().required()
    })

    const { error } = productoSchema.validate(producto)

    return error
}


// ----------------------------- Prueba -------------------------------
/*
const prod = {
    nombre: "Towels",
    precio: "80.00",
    stock: 77,
    marca: "Outdoors",
    categoria: "Oriental Wooden Car",
    detalles: "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    envio: false,
    foto: "https://loremflickr.com/640/480/business",
}

console.log( `\nError de formato en campos del producto: ${validar(prod)?.details[0].message}\n`)
*/
// ------------------------------------------------------------------

export default validar