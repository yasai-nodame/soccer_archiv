import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'

const Navbar = () => {
    return (
    <div className='navbar'>
        <div className="navbar-left">
            <img src={logo} alt="" />
        </div>
        <div className="navbar-right"></div>
    </div>
    )
}

export default Navbar
