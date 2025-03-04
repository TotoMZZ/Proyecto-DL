import ModelFactory from "../modelo/DAOs/usuarios/usuariosFactory.js"
import config from '../config.js'

class Servicio {

    constructor() {
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA)
    }

    loginUsuario = async credenciales => {
        //console.log('login:', credenciales)
        const usuarios = await this.model.obtenerUsuarios()
        //console.log(usuarios)

        const usuarioLogueadoOK = usuarios.filter(u => u.email === credenciales.email && u.password === credenciales.password)
        //console.log(usuarioLogueadoOK)

        if(usuarioLogueadoOK.length === 1) {
            const { nombre, email, admin } = usuarioLogueadoOK[0]
            const usuario = { nombre, email, admin } 
            return { status: 'loginOk', usuario }
        }
        else {
            return { status: 'loginError' }
        }
    }

    registerUsuario = async credenciales => {
        //console.log('register:', credenciales)
        const usuarioRegistrado = await this.model.guardarUsuario(credenciales)
        return usuarioRegistrado
    }
}

export default Servicio