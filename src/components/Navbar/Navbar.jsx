import './navbar.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

function Navbar() {
  const authContext = useContext(AuthContext);

  const isLoggedIn = authContext.isLoggedIn;

  const logoutHandler = () => {
    authContext.logout();
  };

  return (
    <header className="navbar">
      <div className="container">
        <nav className="navbar__nav">
          <h3 className="nav__brand">TV LIBRARY</h3>

          <ul className="nav__links">
            {!isLoggedIn && (
              <li className="links__link">
                <Link to="/auth">Login</Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="links__link">
                <Link to="/">Home</Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="links__link">
                <Link to="/search">Search</Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="links__link">
                <Link to="/library">My Library</Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="links__link">
                <Link to="/auth" onClick={logoutHandler}>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
