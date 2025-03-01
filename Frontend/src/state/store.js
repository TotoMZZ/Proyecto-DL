import { configureStore } from "@reduxjs/toolkit"
import { carritoReducer } from "./reducers.js"


// ---------------------- Redux ------------------------
// https://es.redux.js.org/
// Instalación: npm i redux react-redux @reduxjs/toolkit
// -----------------------------------------------------
export const store = configureStore({
    reducer: carritoReducer,
    preloadedState: {
        cantidad: 0
    },
    //Redux DevTools: https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
    devTools: true
})