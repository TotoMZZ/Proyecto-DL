import axios from "axios"

//const url = `http://localhost:8080/api/usuarios/`
const url = process.env.NODE_ENV === 'production'
            ? '/api/usuarios/'                         // en producción
            : `http://localhost:${process.env.REACT_APP_PORT_SRV_DEV}/api/usuarios/`   // en desarrollo


export const login = async credenciales => (await axios.post(url+'login', credenciales)).data
export const register = async credenciales => (await axios.post(url+'register', credenciales)).data
