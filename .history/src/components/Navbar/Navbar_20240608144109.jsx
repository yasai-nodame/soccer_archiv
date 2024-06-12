import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'

const Navbar = () => {
    return (
    <div className='navbar'>
        <div className="navbar-left">
            <img src={logo} alt="" />
            <ul>
                <li>Home</li>
                <li>プレミアリーグ</li>
                <li>FAカップ</li>
            </ul>
        </div>
        <div className="search-box">
            <img src={search_icon} alt="" className='icons'/>
            <input type="text" placeholder="Search..."></input>
        </div>
    </div>
    )
}

export default Navbar
