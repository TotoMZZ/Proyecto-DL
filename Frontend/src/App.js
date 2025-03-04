import './App.css';

import { Navbar } from './componentes/Navbar.js';

import { Login } from './componentes/Login.js';

import { Index as Inicio } from './componentes/INICIO/Index.js'
import { Index as Alta } from './componentes/ALTA/Index.js'
import { Index as Carrito } from './componentes/CARRITO/Index.js'
import { Index as Contacto } from './componentes/CONTACTO/Index.js'
import { Index as Nosotros } from './componentes/NOSOTROS/Index.js'
import { Index as Otra } from './componentes/OTRA/Index.js'

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
        { login
          ?<header>
            <Navbar admin={admin} />
            <div>
              <div id="logo">Logo</div>
              <div id="barra-busqueda">
                <form action="#">
                  {/* <label htmlFor="Buscar">Buscara</label> */}
                  <input type="text" />
                  <input type="submit" value="Buscar" />
                </form>
              </div>
              
                <div id="boton-carrito">
                  <div className="position-relative">
                    <NavLink className="nav-link" to="/carrito">C</NavLink>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      { cantidad > 0 && cantidad}
                    </span>
                  </div>
                </div>
              
              <div id='boton-logout' onClick={logout}><b>Logout</b> <i>{usuario.nombre}</i></div>
            </div>
          </header>
          :
          <header>
            <span id="titulo">ECommerce</span>
          </header>
        }

        <main>
          { login
            ?<Routes>
              <Route index element={<Inicio />} />

              <Route path="inicio" element={<Inicio />} />
              { admin && <Route path="alta" element={<Alta />} />}
              <Route path="carrito" element={<Carrito />} />
              <Route path="contacto" element={<Contacto />} />
              <Route path="nosotros" element={<Nosotros />} />
              <Route path="otra" element={<Otra />} />

              <Route path="*" element={<Inicio />} />
            </Routes>
            : <Login/>
          }
        </main>

      

      <footer>
        <h3>Copyright 2024</h3>
      </footer>
    </div>
  );
}

export default App;
