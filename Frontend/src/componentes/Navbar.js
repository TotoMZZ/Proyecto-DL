import { NavLink } from "react-router";

export const Navbar = props => {
    const { admin } = props
    return(
        <nav>
        <ul>
            <li> <NavLink to="/inicio">Inicio</NavLink> </li>
            { admin && <li> <NavLink to="/alta">Alta</NavLink> </li>}
            <li> <NavLink to="/carrito">Carrito</NavLink> </li>
            <li> <NavLink to="/contacto">Contacto</NavLink> </li>
            <li> <NavLink to="/nosotros">Nosotros</NavLink> </li>
            <li> <NavLink to="/otra">Otra</NavLink> </li>
        </ul>
    </nav>
    )
}    