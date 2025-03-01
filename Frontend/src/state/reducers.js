import { SET_CANTIDAD } from "./types.js"

export const carritoReducer = (state, action) => {
    console.log('3. REDUCER -> carritoReducer', state, action)

    switch(action.type) {
        case SET_CANTIDAD:
            /*
            //NO!!!!! porque si modifico el state de entrada no cumplo con Reducer PURO
            state.cantidad = action.payload
            return state
            */
           // spread operador (...) + Object Merge
            return {...state, cantidad: action.payload}
        
        default:
            return state
    }
}

