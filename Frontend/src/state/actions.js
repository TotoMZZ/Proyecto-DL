import { SET_CANTIDAD } from "./types.js"

export const accionSetCantidad = cantidad => {
    console.log('2. ACTION -> accionSetCantidad', cantidad)

    return {
        type: SET_CANTIDAD,
        payload: cantidad
    }
}