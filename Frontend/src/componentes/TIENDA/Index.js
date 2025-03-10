import { NavLink } from 'react-router';
import './Index.css'


export function Index() {
    return (
        <main>
            <div className="categorias">
                <NavLink className="nav-link" to="/e-books">
                    <div className='e-books flex'>
                        <img src="/img/frutas.jpg" alt="" />
                        <h2>E-Books</h2>
                    </div>
                </NavLink>

                <NavLink className="nav-link" to="/recetarios">
                    <div className='recetarios flex'>
                        <img src="/img/frutas.jpg" alt="" />
                        <h2>Recetarios</h2>
                    </div>
                </NavLink>

                <NavLink className="nav-link" to="/cursos">
                    <div className='cursos flex'>
                        <img src="/img/frutas.jpg" alt="" />
                        <h2>Cursos</h2>
                    </div>
                </NavLink>
            </div>
        </main>
    )
}