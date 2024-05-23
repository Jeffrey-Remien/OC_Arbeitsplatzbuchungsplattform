import './Navbar.css';
import { NavLink } from 'react-router-dom';


function Navbar() {
    return (
        <nav className="nav">
            <ul className="ul">
                <li className="li">
                    <NavLink exact to="/" activeClassName="active-link">Tagesansicht</NavLink>
                </li>
                <li className="li">
                    <NavLink exact to="/MyBookings" activeClassName="active-link">Meine Buchungen</NavLink>
                </li>
            </ul>
        </nav>
    );
  }

export default Navbar;