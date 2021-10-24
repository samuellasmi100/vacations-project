import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/app-state';
import logo from '../../images/logo.png'
import './Header.css';

export const Header = () => {
    const auth = useSelector((state:AppState) => state.auth)
    const isAdmin = auth.admin;
    const isLoggedIn = auth.token;
    
    return(
        <header>
          <div className="logo">
           <img src={logo} alt="{logo}" />
         </div>
        <nav>
          <ul>
           {!isLoggedIn &&<li><Link to="/">Home</Link></li>}
           {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
           {!isLoggedIn && <li><Link   to="/register">Register</Link></li>}
           {isAdmin === 1 && isLoggedIn && <li><Link  to="/add">Add Vacation</Link></li>}
           {isAdmin === 1 && isLoggedIn && <li><Link to="/chart">Chart Info</Link></li>}
           {isLoggedIn && <li><Link  to="/logout">Log Out</Link></li>}
          </ul>
        </nav>
      </header>
    )
};
