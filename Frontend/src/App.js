import './App.css';

import React from 'react';

import { Navbar } from './componentes/Navbar.js';

import { Login } from './componentes/Login.js';

import { Index as Tienda } from './componentes/TIENDA/Index.js'
import { Index as Alta } from './componentes/ALTA/Index.js'
import { Index as Carrito } from './componentes/CARRITO/Index.js'
import { Index as Contacto } from './componentes/CONTACTO/Index.js'
import { Index as Sobremi } from './componentes/SOBRE-MI/Index.js'
import { Index as Inicio } from './componentes/INICIO/Index.js'

import { Index as Ebooks } from './componentes/TIENDA/E-BOOKS/Index.js'
import { Index as Recetarios } from './componentes/TIENDA/RECETARIOS/Index.js'
import { Index as Cursos } from './componentes/TIENDA/CURSOS/Index.js'


import { NavLink, Route, Routes, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { accionSetLogin, accionSetUsuarioLogueado } from './state/actions.js';



function App() {
  const cantidad = useSelector(state => state.cantidad)
  const login = useSelector(state => state.login)
  const usuario = useSelector(state => state.usuarioLogueado)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  function logout() {
    dispatch(accionSetUsuarioLogueado({}))
    dispatch(accionSetLogin(false))

    navigate('/')
  }

  const { admin } = usuario

  return (
    <div className="App">
      {login
        ? <header>

          <div className='header'>

            <div id="logo">
              <img src={`/img/logo.png`} alt="" />
            </div>

            <div className="navbar">
              <Navbar admin={admin} />
            </div>

            <div className="right">
              <div className="icons">
                <div id="barra-busqueda">
                  <img src="/img/search.png" alt="" />

                </div>

                <div id="boton-carrito">
                  <div className="position-relative">

                    <NavLink className="nav-link" to="/carrito">
                      <img src="/img/cart.png" alt="" />
                    </NavLink>

                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cantidad > 0 && cantidad}
                    </span>
                    
                  </div>
                </div>

                <div id='boton-logout' onClick={logout}>
                  {/* <i>{usuario.nombre}</i> */}
                  <img src="/img/user.png" alt="" />
                </div>

              </div>
            </div>
          </div>

        </header>
        :
        <header>
          <span id="titulo">ECommerce</span>
        </header>
      }

      <main>
        {login
          ? <Routes>
            <Route index element={<Inicio />} />

            <Route path="inicio" element={<Inicio />} />
            <Route path="tienda" element={<Tienda />} />
            {admin && <Route path="alta" element={<Alta />} />}
            {<Route path="carrito" element={<Carrito />} />}
            <Route path="contacto" element={<Contacto />} />
            <Route path="sobremi" element={<Sobremi />} />

            <Route path="e-books" element={<Ebooks />} />
            <Route path="recetarios" element={<Recetarios />} />
            <Route path="cursos" element={<Cursos />} />
            

            <Route path="*" element={<Inicio />} />
          </Routes>
          : <Login />
        }
      </main>



      <footer>
        <h3>Copyright 2024</h3>
      </footer>
    </div>
  );
}

export default App;
