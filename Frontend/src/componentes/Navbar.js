import { NavLink, useLocation } from "react-router-dom";

export const Navbar = ({ admin }) => {
    const location = useLocation();

    return (
        <nav>
            <ul>
                <li>
                    <NavLink
                        to="/inicio"
                        style={{
                            color: location.pathname === "/inicio" ? "#00b100" : "#b9b9b9de",
                            fontWeight: location.pathname === "/inicio" ? "bold" : "normal"
                        }}
                    >
                        Inicio
                    </NavLink>
                </li>
                
                {admin &&
                    <li>
                        <NavLink
                            to="/alta"
                            style={{
                                color: location.pathname === "/alta" ? "#00b100" : "#b9b9b9de",
                                fontWeight: location.pathname === "/alta" ? "bold" : "normal"
                            }}
                        >
                            Alta
                        </NavLink>
                    </li>
                }
                

                <li>
                    <NavLink
                        to="/sobremi"
                        style={{
                            color: location.pathname === "/sobremi" ? "#00b100" : "#b9b9b9de",
                            fontWeight: location.pathname === "/sobremi" ? "bold" : "normal"
                        }}
                    >
                        Sobre mi
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/tienda"
                        style={{
                            color: location.pathname === "/tienda" ? "#00b100" : "#b9b9b9de",
                            fontWeight: location.pathname === "/tienda" ? "bold" : "normal"
                        }}
                    >
                        Tienda
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/contacto"
                        style={{
                            color: location.pathname === "/contacto" ? "#00b100" : "#b9b9b9de",
                            fontWeight: location.pathname === "/contacto" ? "bold" : "normal"
                        }}
                    >
                        Contacto
                    </NavLink>
                </li>


            </ul>
        </nav>
    );
};
