import { LOGIN, SET_CANTIDAD, USUARIO_LOGUEADO } from "./types.js"

export const appReducer = (state, action) => {
    //console.log('3. REDUCER -> carritoReducer', state, action)

    switch (action.type) {
        case SET_CANTIDAD:
            return { ...state, cantidad: action.payload }

        case LOGIN:
            localStorage.setItem('login', JSON.stringify(action.estado))
            return { ...state, login: action.estado }   // SPREAD OPERATOR + Object Merge

        case USUARIO_LOGUEADO:
            localStorage.setItem('usuario', JSON.stringify(action.usuario))
            return { ...state, usuarioLogueado: action.usuario }   // SPREAD OPERATOR + Object Merge

        default:
            return state
    }
}

