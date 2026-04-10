import React from 'react'
import {NavLink, Link, useNavigate} from 'react-router-dom'
import {useTheme} from "../contexts/ThemeContext"
import {useAuth} from "../contexts/AuthContext"
import { useNotify } from '../contexts/NotifiacationContext'
const Navbar = () => {
    const {theme, toggleTheme} = useTheme();
    const {user, isAuth, logout} = useAuth();
    const notify = useNotify();
    const navigate = useNavigate();
    const linkClass = ({isActive}) => 
        `nav_link ${isActive ? 'nav_link--active' : ''}`;
    function handleLogout () {
        logout();
        notify.success("Logged out Successfully");
        navigate("/");
    }
    return (
    <header className='navbar'>
      <div className='container navbar__inner'>
        <Link to='/' className='navbar__logo'>✉ Chatriox</Link>
        <nav className='navbar__nav'>
          <NavLink to='/'          className={linkClass} end>Home</NavLink>
          <NavLink to='/features'  className={linkClass}>Features</NavLink>
          <NavLink to='/pricing'   className={linkClass}>Pricing</NavLink>
          {isAuth && <NavLink to='/campaigns' className={linkClass}>Campaigns</NavLink>}
        </nav>
        <div className='navbar__actions'>
          <button className='theme-btn' onClick={toggleTheme} aria-label='Toggle theme'>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {isAuth ? (
            <div className='user-menu'>
              <div className='avatar'>{user.avatar}</div>
              <span>{user.name}</span>
              <button onClick={handleLogout} className='btn btn--outline btn--sm'>
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to='/login' className='btn btn--outline btn--sm'>Login</Link>
              <Link to='/pricing' className='btn btn--primary btn--sm'>Get Started</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
export default Navbar;
 
