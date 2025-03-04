import { configureStore } from "@reduxjs/toolkit"
import { appReducer } from "./reducers.js"


// ---------------------- Redux ------------------------
// https://es.redux.js.org/
// Instalación: npm i redux react-redux @reduxjs/toolkit
// -----------------------------------------------------
export const store = configureStore({
    reducer: appReducer,
    preloadedState: {
        cantidad: 0,
        login: JSON.parse(localStorage.getItem('login')) || false,
        usuarioLogueado: JSON.parse(localStorage.getItem('usuario')) || {}
    },
    //Redux DevTools: https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
    devTools: true
})