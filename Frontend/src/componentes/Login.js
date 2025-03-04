import { useState } from 'react'
import './Login.css'

import * as servicioUsuarios from '../servicios/usuarios.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { accionSetLogin, accionSetUsuarioLogueado } from '../state/actions.js'


export const Login = () => {
    const formIni = { email: '', password: '', nombre: '', admin: false }
    const [ credenciales, setCredenciales ] = useState(formIni)
    const [ modoRegistro, setModoRegistro ] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = async e => {
        e.preventDefault()

        //console.log(modoRegistro, credenciales)

        if(!modoRegistro) {
            const rta = await servicioUsuarios.login(credenciales)
            //console.log(rta)

            const { status, usuario } = rta
            //console.log(status, usuario)

            if(status === 'loginOk') {

                dispatch(accionSetUsuarioLogueado(usuario))
                dispatch(accionSetLogin(true))

                if(usuario.admin) navigate('/alta')
                else navigate('/inicio')
            }
            else {
                dispatch(accionSetUsuarioLogueado({}))
                dispatch(accionSetLogin(false))

                navigate('/')
            }
        }
        else {
            const usuarioLogueado = await servicioUsuarios.register(credenciales)
            console.log(usuarioLogueado)
            dispatch(accionSetLogin(false))
            setModoRegistro(false)
        }

        setCredenciales(formIni)
    }


    const { email, password, nombre } = credenciales

    return (
        <div className="Login">
            <form onSubmit={onSubmit}>
                {/* botón de selección modo login/register */}
                <input type="button" value={modoRegistro ? 'Ir a Login' : 'Ir a Register'}  onClick={
                    () => setModoRegistro(!modoRegistro)
                } />

                {/* Datos de usuario a registar */}
                {modoRegistro &&
                    <>
                        {/* campo nombre */}
                        <label htmlFor="nombre">nombre</label>
                        <input type="nombre" value={nombre} onChange={
                            e => setCredenciales({ ...credenciales, nombre: e.target.value })}
                        />
                    </>
                }

                {/* campo email */}
                <label htmlFor="email">email</label>
                <input type="email" value={email} onChange={
                    e => setCredenciales({ ...credenciales, email: e.target.value })}
                />

                {/* campo password */}
                <label htmlFor="password">password</label>
                <input type="password" value={password} onChange={
                    e => setCredenciales({ ...credenciales, password: e.target.value })}
                />

                <input type="submit" value={modoRegistro ? 'Register' : 'Login'} readOnly />
            </form>
        </div>
    )
}