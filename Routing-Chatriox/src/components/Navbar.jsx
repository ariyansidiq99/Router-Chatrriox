import React from 'react'
import {NavLink, Link} from 'react-router-dom'

const Navbar = () => {
    const linkClass = ({isActive}) => 
        `nav_link ${isActive ? 'nav_link--active' : ''}`;
    
  return (
    <header className="navbar">
        <div className="container navbar_inner">
            <Link to="/" className='navbar_logo'>
            <span>✉</span> Chatriox
            </Link>
            <nav className="navbar_nav">
                <NavLink to='/' className={linkClass} end>Home</NavLink>
                <NavLink to='/features' className={linkClass} end>Features</NavLink>
                <NavLink to='/pricing' className={linkClass} end>Pricing</NavLink>
                <NavLink to='/campaigns' className={linkClass} end>Campaigns</NavLink>
            </nav>
            <div className="navbar-actions">
                <Link to="/login" className='btn btn--outline btn-sm'>Login</Link>
                <Link to="/pricing" className='btn btn--priamry btn-sm'>Get Started</Link>
            </div>
        </div>
    </header>
  )
}

export default Navbar