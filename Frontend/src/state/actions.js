import { LOGIN, SET_CANTIDAD, USUARIO_LOGUEADO } from "./types.js"

export const accionSetCantidad = cantidad => {
    //console.log('2. ACTION -> accionSetCantidad', cantidad)

    return {
        type: SET_CANTIDAD,
        payload: cantidad
    }
}

export const accionSetLogin = estado => {
    console.warn('ACTION -> accionSetLogin', estado)

    return {
        type: LOGIN,
        estado
    }
}

export const accionSetUsuarioLogueado = usuario => {
    console.warn('ACTION -> accionSetUsuarioLogueado', usuario)

    return {
        type: USUARIO_LOGUEADO,
        usuario
    }
}