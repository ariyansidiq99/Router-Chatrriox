import React from 'react'
import Navbar from './Navbar'
import {Outlet} from "react-router-dom"

const Layout = () => {
  return (
    <div className="app-layout">
        <Navbar />
        <main className="page-content">
            <Outlet />
        </main>
        <footer className="footer">
            <p>© 2025 Chatriox. All rights reserved.</p>
        </footer>
    </div>
  )
}

export default Layout